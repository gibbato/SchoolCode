package threads;

public class DataSharing {

	private static int SharedValue = 0;
	
	public static synchronized void IncrementSharedValue() {
		SharedValue++;
	}
	
	public static synchronized void DecrementSharedValue() {
		SharedValue--;
	}
	
	public static void SetSharedValue(int newSharedValue) {
		SharedValue = newSharedValue;
	}
	
	public static int GetSharedValue() {
		return SharedValue;
	}
}
