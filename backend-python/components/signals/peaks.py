import numpy as np

def find_peaks(prices: list[float]) -> list[int]:
    arr = np.array(prices)
    peaks = [i for i in range(1, len(arr)-1) if arr[i-1] < arr[i] > arr[i+1]]
    return peaks
