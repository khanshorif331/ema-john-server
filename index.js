const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j5vpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})
async function run() {
	try {
		await client.connect()
		const productCollection = client.db('emaJohn').collection('product')

		app.get('/product', async (req, res) => {
			const query = {}
			const cursor = productCollection.find(query)
			const products = await cursor.toArray()
			res.send(products)
		})
	} finally {
	}
}
run().catch(console.dir)
app.get('/', (req, res) => {
	res.send('John is running and waiting for Ema')
})

app.listen(port, () => {
	console.log('Listening to port', port)
})
