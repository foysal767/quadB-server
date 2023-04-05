const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://quadB:8aDSDH5t1GurDU2y@cluster0.mxrfp9v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
async function run() {
  try {
    const quadBCollection = client.db("quadB").collection("quadBData");

    app.get("/topten", async (req, res) => {
      try {
        const query = {};
        const result = await quadBCollection.findOne({});
        let count = 0;
        const alldata = [];
        for (const key in result) {
          if (count >= 1 && count <= 10) {
            alldata.push(result[key]);
          }
          if (count >= 10) {
            break;
          }
          count++;
        }
        console.log(alldata);
        res.send({
          success: true,
          data: alldata,
        });
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
    });
  } catch (error) {
    console.log(error.name, error.message);
  }
}
run();

app.get("/", async (req, res) => {
  res.send("QuadB is Running");
});
app.listen(port, () => {
  console.log(`QuadB port is running on ${port}`);
});

// 8aDSDH5t1GurDU2y
