const mongoose =   require("mongoose");

const CuisineSchema = new mongoose.Schema(
    {
        cuisineName: {
            type: String, 
            unique: true,
            required: true
        }
    }
)

module.exports = mongoose.model('Cuisine', CuisineSchema);