import { saveAs } from 'save-as';
import { DEGEN_ASSETS_DOWNLOAD_URL } from '../constants/characters';

const base64ToBlob = (base64) => {
  const binaryStr = window.atob(base64);
  const binaryLen = binaryStr.length;

  const ArrayBuff = new ArrayBuffer(binaryLen);
  let uintArr = new Uint8Array(ArrayBuff);
  for (let i = 0; i < binaryLen; i++) {
    uintArr[i] = binaryStr.charCodeAt(i);
  }

  const zipTypeBlob = new Blob([ArrayBuff], { type: 'application/zip' });
  return zipTypeBlob;
}

export const downloadDegenAsZip = async (authToken, tokenId) => {
  if (authToken) {
    const res = await fetch(`${DEGEN_ASSETS_DOWNLOAD_URL}?id=${tokenId}`, {
      headers: { authorizationToken: authToken },
    })
    if (res.status === 404) return "error"
    const text = await res.text();
    if (text) {
      const blob = base64ToBlob(text);
      saveAs(blob, `degen_${tokenId}.zip`);
      return text;
    } else return "error"
  } else return "error";
};