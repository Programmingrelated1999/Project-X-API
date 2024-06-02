require("dotenv").config();

//port
const PORT = process.env.PORT || 3001;

//export mongodb uri and port
module.exports = {
  PORT
};