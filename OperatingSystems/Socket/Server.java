package socket;

import java.io.*;
import java.net.Socket;
import java.net.ServerSocket;


public class Server {
	
	public static void main(String[] args) throws IOException {
		Socket client = null;
		PrintWriter pout = null;
		ServerSocket sock = null;
		
		try {
			sock = new ServerSocket(5155);
			while (true) {
				client = sock.accept();
				
				pout = new PrintWriter(client.getOutputStream(), true);
				pout.println("*monke noise*");
				
				client.close();
			}
			
		}catch (IOException ioe){
			System.out.print(ioe);
			System.err.println("server");
		}finally {
			if (client != null) {
				client.close();
			}
			if (sock != null) {
				sock.close();
			}
			if (pout != null) {
				pout.close();
			}
		}
		
	}

}
