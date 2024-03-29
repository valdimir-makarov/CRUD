import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    daysSinceEaten: {
        type: Number,
        required: true,
    },
});

const Food = mongoose.model("Food", foodSchema);

 export default Food;