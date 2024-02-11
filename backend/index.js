const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

// v1 is for prefix the API
app.use("/api/v1", rootRouter);

app.listen(3000, ()=>{
    console.log("Server started");
});
