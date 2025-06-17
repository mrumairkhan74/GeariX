const mongoose = require('mongoose');


const db = mongoose.connect(process.env.MONGO_URI)

db.then(() => {
    console.log('DB Connected')
})
db.catch((error) => {
    console.error(error)
})


module.exports = db