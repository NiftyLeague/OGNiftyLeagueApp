const fs = require("fs");
const request = require("request");

/**
 * Generates NFT image url from character traits.
 * @param {} traits - list of character traits from contract
 */
function generateImageURL(traits) {
  const baseURL = "http://35.175.104.137:56429/";
  const traitArray = [
    ["Tribe", traits[0]],
    ["Skin Color", traits[1]],
    ["Fur Color", traits[2]],
    ["Eye Color", traits[3]],
    ["Pupil Color", traits[4]],
    ["Hair", traits[5]],
    ["Mouth", traits[6]],
    ["Beard", traits[7]],
    ["Facemark", traits[8]],
    ["Misc", traits[9]],
    ["Top", traits[10]],
    ["Outerwear", traits[11]],
    ["Print", traits[12]],
    ["Bottom", traits[13]],
    ["Footwear", traits[14]],
    ["Belt", traits[15]],
    ["Hat", traits[16]],
    ["Eyewear", traits[17]],
    ["Piercing", traits[18]],
    ["Wrist", traits[19]],
    ["Hand", traits[20]],
    ["Neckwear", traits[21]],
    ["Left Hand", traits[22]],
    ["Right Hand", traits[23]],
  ];
  const params = new URLSearchParams({
    version: 83,
    traits: JSON.stringify(traitArray),
    secret: process.env.UNITY_IMAGE_GENERATOR_SECRET,
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
      .on("finish", async () => {
        console.log(`The file is finished downloading.`);
        resolve();
      })
      .on("error", error => {
        reject(error);
      });
  }).catch(error => {
    console.log(`Something happened: ${error}`);
  });
}

module.exports = { generateImageURL, downloadImage };
