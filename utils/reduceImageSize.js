const sharp = require('sharp');

const reduceImageSize = async (buffer) => {
  try {
    const processedImageBuffer = await sharp(buffer)
      .toFormat('png') 
      .toBuffer();
    return processedImageBuffer;
  } catch (error) {
    throw new Error('Error processing image: ' + error.message);
  }
};

module.exports = reduceImageSize;
