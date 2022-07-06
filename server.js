const http = require("http");
const server = http.createServer(require("./app"));
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config("./.env");
// ============================================

// server and mongoose
mongoose.connect(process.env.MONGODB_URL, () => {
  try {
    console.log("db Connect!");
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () =>
      console.log(`Example app listening on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
});
