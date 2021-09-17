const fs = require('fs');
const request = require('request');

/**
 * Returns random background option based on probabilities
 */
function raritySelector() {
  const backgroundOptions = [...Array(90).fill(0), ...Array(6).fill(1), 2, 2, 2, 3];
  const idx = Math.floor(Math.random() * backgroundOptions.length);
  return backgroundOptions[idx];
}

/**
 * Generates NFT image url from character traits.
 * @param {} traits - list of character traits from contract
 * @param {number} rarity - number of background rarity 0-3
 */
function generateImageURL(traits, rarity) {
  const baseURL = 'http://35.175.104.137:56429/';
  const traitArray = [
    ['Tribe', traits[0]],
    ['Skin Color', traits[1]],
    ['Fur Color', traits[2]],
    ['Eye Color', traits[3]],
    ['Pupil Color', traits[4]],
    ['Hair', traits[5]],
    ['Mouth', traits[6]],
    ['Beard', traits[7]],
    ['Top', traits[8]],
    ['Outerwear', traits[9]],
    ['Print', traits[10]],
    ['Bottom', traits[11]],
    ['Footwear', traits[12]],
    ['Belt', traits[13]],
    ['Hat', traits[14]],
    ['Eyewear', traits[15]],
    ['Piercing', traits[16]],
    ['Wrist', traits[17]],
    ['Hands', traits[18]],
    ['Neckwear', traits[19]],
    ['Left Item', traits[20]],
    ['Right Item', traits[21]],
  ];
  const params = new URLSearchParams({
    version: 92,
    traits: JSON.stringify(traitArray),
    secret: process.env.UNITY_IMAGE_GENERATOR_SECRET,
    rarity,
  });
  return `${baseURL}?${params.toString()}`;
}

/**
 * Download NFT image from webserver.
 */
async function downloadImage(url, dest) {
  /* Create an empty file where we can save data */
  const file = fs.createWriteStream(dest);

  /* Using Promises so that we can use the ASYNC AWAIT syntax */
  await new Promise((resolve, reject) => {
    request({
      /* Here you should specify the exact link to the file you are trying to download */
      uri: url,
      gzip: true,
    })
      .pipe(file)
      .on('finish', async () => {
        console.log(`The file is finished downloading.`);
        resolve();
      })
      .on('error', error => {
        reject(error);
      });
  }).catch(error => {
    console.log(`Something happened: ${error}`);
  });
}

module.exports = { raritySelector, generateImageURL, downloadImage };
