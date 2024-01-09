import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Food from "./server/models/Food.js";


const app = express();
app.use(cors());
app.use(express.urlencoded(true));
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 4000;


app.post('/',async(req,res)=>{
     const foodName = req.body.foodName;
     const   daysSinceEaten = req.body.daysSinceEaten
     const  newFood = new Food ({
         foodName:"Mango",
         daysSinceEaten:4
     });
      try{
        await newFood.save()
        res.send("Saved successfully food")
      }
      catch(error){
        console.log(error)

      }
})


app.get('/display',(req,res)=>{
    
 Food.find().then(result=>{
    console.log(result)
    res.send(result)
 }).catch((error)=>{
    console.log(error)
 })



})

app.put('/update:id', async(req, res) => {
    // Extract data from the request body
    const { newFoodName, id } = req.body;

   
    try {
        const update = await Food.findById(id);

        if (!update) {
            return res.status(404).send("Food not found");
        }

        update.foodName = newFoodName;
        await update.save();

        res.send("Updated");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});




try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected');
} catch (error) {
    console.log(error);
}
app.listen(PORT ,()=>{
    console.log(`SERVER is Running ${PORT}`)
})
 


