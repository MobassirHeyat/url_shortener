const app = require("./src/app");
const connectDB = require("./src/db/database");

const PORT = 3000;
connectDB();

app.listen(PORT);
