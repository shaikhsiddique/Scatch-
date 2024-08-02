const sharp = require('sharp');

const reduceImageSize = async (buffer) => {
  try {
    const processedImageBuffer = await sharp(buffer)
      .resize({ width: 800, height: 600 }) // Resize image
      .toFormat('jpeg') // Convert to JPEG format
      .toBuffer();
    return processedImageBuffer;
  } catch (error) {
    throw new Error('Error processing image: ' + error.message);
  }
};

module.exports = reduceImageSize;
