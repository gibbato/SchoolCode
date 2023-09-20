/*
Group 4
-----------------
Michael Maciel
Michael Gibson
Nisapat Poolkwan
Thomas Yeung
------------------
09/18/2023
------------------
*/

"use strict";

var gl;

var directionX = 0;
var directionY = 0;
var directionXLoc;
var directionYLoc;

// For multiple key presses ~ Up, down, left, right
// For ex. W and D together would make square move towards top right
var directions = [false, false, false, false];

window.onload = function init() {
    var canvas = document.getElementById( "gl-canvas" );

    gl = gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL 2.0 isn't available" ); }

    // Four Vertices
    var vertices = [
        // x,    y,    R,    G,    B
         0.0,  0.5,  1.0,  0.0,  0.0,
        -0.5,  0.0,  1.0,  0.0,  0.0,
         0.0,  0.0,  0.6,  0.0,  0.6,
         0.0, -0.5,  0.0,  1.0,  0.0,
         0.5,  0.0,  0.0,  0.0,  1.0,
         0.5, -0.5,  0.0,  1.0,  1.0
    ];

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.9, 0.95, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW );

    // Associate out shader variable with our data buffer
    var aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0 );
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT );
    gl.enableVertexAttribArray(aColor);

    window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);

        switch (key) {
            case 'W':
                directions[0] = true;
                break;
            case 'S':
                directions[1] = true;
                break;
            case 'A':
                directions[2] = true;
                break;
            case 'D':
                directions[3] = true;
                break;
            case '1':
                directionX = 0;
                directionY = 0;
                break;
        }
    };
    window.onkeyup = function(event) {
        var key = String.fromCharCode(event.keyCode);

        switch (key) {
            case 'W':
                directions[0] = false;
                break;
            case 'S':
                directions[1] = false;
                break;
            case 'A':
                directions[2] = false;
                break;
            case 'D':
                directions[3] = false;
                break;
        }
    };

    directionXLoc = gl.getUniformLocation(program, "uDirectionX");
    directionYLoc = gl.getUniformLocation(program, "uDirectionY");

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    // If you have A pressed and D pressed at the same time, they would just cancel each other out
    if (directions[0]) directionY += 0.02;
    if (directions[1]) directionY -= 0.02;
    if (directions[2]) directionX -= 0.02;
    if (directions[3]) directionX += 0.02;

    // Restrict directionX & directionY between -0.5 to 0.5 so square doesn't go out of frame
    // Because square is from -0.5 to 0.5. So it has another 0.5 to move before hitting the border
    directionY = Math.min(0.5, Math.max(-0.5, directionY));
    directionX = Math.min(0.5, Math.max(-0.5, directionX));

    gl.uniform1f(directionXLoc, directionX);
    gl.uniform1f(directionYLoc, directionY);

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );

    requestAnimationFrame(render);
}
