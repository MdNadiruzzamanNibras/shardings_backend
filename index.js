const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors');
const port = 5000

const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors())
app.use(express.json())

// 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.glp8dje.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
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
    // Connect the client to the server	(optional starting in v4.7)
     client.connect();

      const MeetCollection = client.db('Meet').collection('massage');
      
      app.post('/chats', async(req,res)=>{
          const chat = req.body 
          console.log(chat, "chat");
          const result = await MeetCollection.insertOne(chat)
          console.log(result, 'result');
      res.send(result)
    })
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})