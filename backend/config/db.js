const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDB