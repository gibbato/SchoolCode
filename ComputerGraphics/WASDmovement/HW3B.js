
var canvas;
var gl;

var colors = [];
var positions = [];

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL 2.0 isn't available" ); }

    // Four Vertices

    var vertices = [
     // x   y  R    G    B
        0, .5, 1.0, 0.0, 0.0,
        -.5, 0, 0.0, 1.0, 0.0,
        0,  -.5, 0.0, 0.0, 1.0,
        .5, 0, 0.25, 0.5, 0.0
    ];

console.log("vertices");




     //  Configure WebGL

 gl.viewport( 0, 0, canvas.width, canvas.height );
 gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

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




     render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}
