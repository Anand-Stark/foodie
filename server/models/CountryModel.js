const mongoose  = require('mongoose')

const countrySchema = new mongoose.Schema({
    country_code : {
        type: String,
        required : true
    },
    country : { 
        type: String,
        required : true
    }
})

module.exports = mongoose.model('country', countrySchema)