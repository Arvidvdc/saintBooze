const mongoose = require("mongoose");
 
const maintenanceSchema = new mongoose.Schema(
    {
        item: {
            type: String,
            unique: true,
            required: true,
            dropDups: true
        },
        english: String,
        category: {
                type: String,
                required: true,
            },
        categoryMain: {
                type: String,
                required: true,
            },
        description: String,
        isActive: Boolean,
        dateAdded: {
            type: Date,
            default: Date.now
        }
    }
);
 
module.exports = mongoose.model("maintenance", maintenanceSchema);