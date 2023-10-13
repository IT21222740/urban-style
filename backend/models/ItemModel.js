const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    varients: {
        type: [String],
        
    },
    prices: {
        type: [{
            small: Number,
            medium: Number,
            large: Number
        }],
        
    },
    image: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    isTop: {
        type: Boolean,
        
    },
    isPants: {
        type: Boolean,
        
    },
    isFootwear: {
        type: Boolean,
        
    },
}, {
    timestamps: true,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
