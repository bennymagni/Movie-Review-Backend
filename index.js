const app = require('./server');
const { MongoClient } = require('mongodb');
const { config } = require('dotenv');
const MoviesDAO = require('./dao/moviesDAO')
const ReviewsDAO = require('./dao/reviewsDAO')

const main = async () => {
    config();

    const client = new MongoClient(process.env.MOVIEREVIEWS_DB_URI)

    const port = process.env.port || 8000

    try {
       await client.connect();
       await MoviesDAO.injectDB(client);
       await ReviewsDAO.injectDB(client);

       app.listen(port, () => {
        console.log(`server is running on port ${port}`)
       })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

}

main().catch(console.error);