package threads;

public class Driver {
	public static void main(String[] args) {
		if (args.length > 0) {
			if (Integer.parseInt(args[0]) < 0) {
				System.err.println("Error, " + args[0] + " must be > 0");
			} else {

				// Threads 1 and 2

				Thread numbers = new Thread(() -> {
					for (int i = 0; i < 10; ++i) {
						System.out.println(i);
						try {
							Thread.sleep(500);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				});

				Thread letters = new Thread(() -> {
					for (char c = 'a'; c < 'j'; c++) {
						System.out.println(c);
						try {
							Thread.sleep(300);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				});

				// Threads 3 and 4

				Thread thread3 = new Thread(() -> {
					for (int i = 0; i < 10; ++i) {
						DataSharing.IncrementSharedValue();
						System.out.println(DataSharing.GetSharedValue());
						try {
							Thread.sleep(200);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				});

				Thread thread4 = new Thread(() -> {
					for (int i = 0; i < 10; ++i) {
						DataSharing.DecrementSharedValue();
						System.out.println(DataSharing.GetSharedValue());
						try {
							Thread.sleep(200);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				});

				// Start the threads
				numbers.start();
				letters.start();

				try {
					// Wait for both threads to complete
					numbers.join();
					letters.join();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}

				thread3.start();
				thread4.start();

				try {
					thread3.join();
					thread4.join();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}

			}
		}
	}

}
