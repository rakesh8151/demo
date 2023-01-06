if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: "./demo/.env" });
    console.log(process.env.PORT);
}

module.exports = {
    PORT: process.env.PORT
}