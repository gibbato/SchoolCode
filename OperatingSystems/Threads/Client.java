package socket;

import java.io.*;
import java.net.Socket;

public class Client {

	public static void main(String[] args) throws IOException {
		InputStream in = null;
		BufferedReader bin = null;
		Socket sock = null;

		try {
			
			sock = new Socket("127.0.0.1", 5155);
			
			in = sock.getInputStream();
			bin = new BufferedReader(new InputStreamReader(in));

			String line;

			while ((line = bin.readLine()) != null) {
				System.out.print(line);
			}
			
		}catch (IOException ioe) {
			System.err.println(ioe);
			System.err.println("client");
		}finally {
			if(sock != null) {
				sock.close();
			}
		}
		
		
	}
}
