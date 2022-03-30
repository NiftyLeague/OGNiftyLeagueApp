import { saveAs } from 'save-as';
import { DEGEN_ASSETS_DOWNLOAD_URL } from '../constants/characters';

export const base64ToBlob = (base64: string): Blob => {
  const binaryStr = window.atob(base64);
  const binaryLen = binaryStr.length;
  const ArrayBuff = new ArrayBuffer(binaryLen);
  const uintArr = new Uint8Array(ArrayBuff);
  for (let i = 0; i < binaryLen; i++) {
    uintArr[i] = binaryStr.charCodeAt(i);
  }
  const zipTypeBlob = new Blob([ArrayBuff], { type: 'application/zip' });
  return zipTypeBlob;
};

export const downloadDegenAsZip = async (authToken: string, tokenId: string): Promise<string> => {
  try {
    const res = await fetch(`${DEGEN_ASSETS_DOWNLOAD_URL}?id=${tokenId}`, {
      headers: { authorizationToken: authToken },
    });
    const text = await res.text();
    const blob = base64ToBlob(text);
    saveAs(blob, `degen_${tokenId}.zip`);
    return 'Degen assets are downloaded successfully!';
  } catch (error) {
    console.log(`ERROR occured downloading assets for degen. ${tokenId}.\n ${error}`);
    return `ERROR occured downloading assets for degen. ${tokenId}.\n ${error}`;
  }
};
