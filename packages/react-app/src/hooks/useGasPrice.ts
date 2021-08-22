import { useCallback, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BigNumber, utils } from 'ethers';
import { GasStationResponse, Network } from 'types/web3';
import isEqual from 'lodash/isEqual';
import useAsyncInterval from './useAsyncInterval';

export default function useGasPrice(targetNetwork: Network, speed: string, pollTime = 9999): BigNumber {
  const gasPriceRef = useRef(utils.parseUnits('20', 'gwei'));
  const loadGasPrice = useCallback(async () => {
    if (targetNetwork.gasPrice) {
      gasPriceRef.current = targetNetwork.gasPrice;
    } else if (navigator.onLine) {
      await axios
        .get('https://ethgasstation.info/json/ethgasAPI.json')
        .then((response: AxiosResponse<GasStationResponse>) => {
          const newGasPrice = BigNumber.from(response.data[speed || 'fast'] * 100000000);
          if (!isEqual(newGasPrice, gasPriceRef.current)) gasPriceRef.current = newGasPrice;
        })
        .catch(error => console.log(error));
    }
  }, [targetNetwork.gasPrice, speed]);

  useAsyncInterval(loadGasPrice, pollTime);
  return gasPriceRef.current;
}
