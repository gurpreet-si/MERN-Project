const express = require('express')
const app = express()
const cors= require('cors')
const port = process.env.PORT || 7000;
require('dotenv').config()
console.log(process.env.DB_USER)

// gurpreetsingh56292
// 0cTsGdqNgJmNWus1

// middleware
app.use(cors());
app.use(express.json());

// mongoDB config


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-cluster.hdu5ml9.mongodb.net/?retryWrites=true&w=majority&appName=demo-foodi-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    // databse and collections
    const menuCollections = client.db("demo-foodi-client").collection("menus");
    const cartCollections = client.db("demo-foodi-client").collection("cartItems");

    // all menu items operations
    app.get('/menu', async(req, res) => {
        const result = await menuCollections.find().toArray();
        res.send(result)
    })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})