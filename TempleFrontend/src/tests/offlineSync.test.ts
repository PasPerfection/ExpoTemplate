import { saveOfflinePayment, syncOfflinePayments } from '../utils/offlineSync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initiatePayment } from '../services/payment';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('../services/payment');

describe('offlineSync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saves offline payment', async () => {
    await saveOfflinePayment(100);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('offlinePayments');
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('syncs offline payments', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([{ amount: 100 }, { amount: 200 }]));
    await syncOfflinePayments();
    expect(initiatePayment).toHaveBeenCalledTimes(2);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('offlinePayments');
  });
});