const Jimp = require('jimp');

async function main() {
  try {
    const image = await Jimp.read('public/logo_unpilar.png');
    
    await image.clone().resize(192, 192).writeAsync('public/pwa-192x192.png');
    await image.clone().resize(512, 512).writeAsync('public/pwa-512x512.png');
    
    // Create an apple touch icon with some padding and white background
    const appleBg = new Jimp(180, 180, '#FFFFFF');
    const appleImg = await Jimp.read('public/logo_unpilar.png');
    appleImg.resize(150, 150); // Add some padding
    appleBg.composite(appleImg, 15, 15);
    await appleBg.writeAsync('public/apple-touch-icon.png');
    
    // Favicon
    await image.clone().resize(32, 32).writeAsync('public/favicon.ico');
    
    console.log('Icons generated successfully.');
  } catch (err) {
    console.error(err);
  }
}

main();
