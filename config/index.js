const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    service_name : process.env.SERVICE_NAME,
    urlDb : process.env.MONGO_URL
}