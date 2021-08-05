import { useCallback, useRef } from 'react';
import axios from 'axios';
import usePoller from './usePoller';

export default function useGasPrice(targetNetwork, speed, pollTime = 9999) {
  const gasPriceRef = useRef();
  const loadGasPrice = useCallback(async () => {
    if (targetNetwork.gasPrice) {
      gasPriceRef.current = targetNetwork.gasPrice;
    } else if (navigator.onLine) {
      axios
        .get('https://ethgasstation.info/json/ethgasAPI.json')
        .then(response => {
          const newGasPrice = response.data[speed || 'fast'] * 100000000;
          if (newGasPrice !== gasPriceRef.current) gasPriceRef.current = newGasPrice;
        })
        .catch(error => console.log(error));
    }
  }, [targetNetwork.gasPrice, speed]);

  usePoller(loadGasPrice, pollTime);
  return gasPriceRef.current;
}
