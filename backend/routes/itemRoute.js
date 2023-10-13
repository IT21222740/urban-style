const express = require("express");
const router = express.Router();
const Item = require('../models/ItemModel')


//add new items
router.post("/add/item", async (req, res) => {
  const { newName, newVarients, newPrices, newImage, newisFootwear, newisPants, newisTop, newDescription } = req.body;

  try {
      const items = new Item({
        name : newName,
        image : newImage,
        isFootwear : newisFootwear,
        isPants : newisPants,
        isTop : newisTop,
        description : newDescription,
        varients : newVarients,
        prices : newPrices,
      });

      await items.save();
      res.send('Item added successfully!');
  } catch (error) {
      return res.status(400).json({ message: error });
  }
});


//get all items
router.get("/getallItems", async (req, res) => {

    try {

        const Items = await Item.find({})
        res.send(Items)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

//get current item
router.get("/getcurrentitem/:id", async (req, res) => {

    let itemId = req.params.id;
    try {

        const currentitem = await Item.findById(itemId)
        res.send(currentitem)

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})

//update items
router.put("/update/item/:id", async (req, res) => {
    const itemId = req.params.id;
    const { name, varients, prices, image, isFootwear, isPants, isTop, description } = req.body;
  
    try {
      const updateitems = {
        name,
        image,
        isFootwear,
        isPants,
        isTop,
        description,
        varients,
        prices,
      };
      await Item.findByIdAndUpdate(itemId, updateitems);
      res.send('items updated successfully!');
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });


  //Delete items
router.delete("/delete/item/:id", async (req, res) => {

  let itemId = req.params.id;

  try {
      await Item.findByIdAndDelete(itemId)

      res.send('Item Deleted Successfully')
  }

  catch (error) {


      return res.status(400).json({ message: error });
  }
});
  
  

module.exports = router;