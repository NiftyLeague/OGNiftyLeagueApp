import { useRef } from "react";
import { usePoller } from "eth-hooks";
import axios from "axios";

export default function useGasPrice(targetNetwork, speed, pollTime) {
  const gasPriceRef = useRef();
  const loadGasPrice = async () => {
    if (targetNetwork.gasPrice) {
      gasPriceRef.current = targetNetwork.gasPrice;
    } else if (navigator.onLine) {
      axios
        .get("https://ethgasstation.info/json/ethgasAPI.json")
        .then(response => {
          const newGasPrice = response.data[speed || "fast"] * 100000000;
          if (newGasPrice !== gasPriceRef.current) gasPriceRef.current = newGasPrice;
        })
        .catch(error => console.log(error));
    }
  };

  usePoller(loadGasPrice, pollTime || 9999);
  return gasPriceRef.current;
}
