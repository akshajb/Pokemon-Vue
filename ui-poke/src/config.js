require('dotenv').config()

const config = {
    imageSrc : process.env.VUE_APP_IMAGE_URL,
    spriteSrc : process.env.VUE_APP_SPRITE_URL,
    apiSrc : process.env.VUE_APP_API_URL
}

module.exports = config;