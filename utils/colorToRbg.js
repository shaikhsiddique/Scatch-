const Color = require("color");

const colorToRbg = (c) => {
  try {
    const color = Color(c); // This should accept color names, hex, etc.
    const rgb = color.rgb().string(); // rgb(255, 0, 0)
    return rgb;
  } catch (error) {
    console.error(`Error converting color ${c}:`, error);
    return null; // Or handle the error as needed
  }
};

module.exports = colorToRbg;
