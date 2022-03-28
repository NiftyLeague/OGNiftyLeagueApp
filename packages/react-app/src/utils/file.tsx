import { saveAs } from 'save-as';
import { DEGEN_DOWNLOAD_URL } from '../constants/characters';

const base64ToBlob = (base64) => {
	let binaryStr = window.atob(base64);
	let binaryLen = binaryStr.length;

	let ArrayBuff = new ArrayBuffer(binaryLen);
	let uintArr = new Uint8Array(ArrayBuff);
	for (let i = 0; i < binaryLen; i++) {
		uintArr[i] = binaryStr.charCodeAt(i);
	}

	let bb = new Blob([ArrayBuff], { type: 'application/zip' });
	return bb;
}

export const DownloadDegenAsZip = async (auth, tokenId) => {
	if (auth) {
		const res = await fetch(`${DEGEN_DOWNLOAD_URL}?id=${tokenId}`, {
			headers: { authorizationToken: auth },
		})
		if (res.status === 404) {
			console.log(res.status);
			return null
		};
		const text = await res.text();
		if (text) {
			const blob = base64ToBlob(text);
			saveAs(blob, 'degen.zip');
		} else {
			console.log("Error occured while downloading DEGEN")
		}
		return null;
	}
	return null;
};