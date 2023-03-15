const db = require("../index");
const Reviews = db.Reviews;

const getAllreviews = async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await Reviews.findAll({
      where: { terrainId: id },
      attributes: ['Comments']
    });

    res.status(201).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const addreview = async (req, res) => {
  try {
    const { playerId, terrainId } = req.params;
    const { Comments } = req.body;

    const review = await Reviews.create({
      Comments,
      playerId: playerId,
      terrainId: terrainId,
    });
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addStars=async(req,res)=>{
  try{
    const { playerId, terrainId } = req.params;
    const {Rating}=req.body

    const query=await Reviews.create({
     Rating,
     playerId:playerId,
     terrainId:terrainId  
    })
    res.status(201).json(query)
  }
  catch(err){
    res.status(404).json({message:"Server Error"})
  }
}
const getAllStars=async(req,res)=>{
  try{
  const {id}=req.params
  const query=await Reviews.findAll({
    where: { terrainId: id },
    attributes: ['Rating']
  })
  res.status(201).json(query);
} 
catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
}
}

module.exports = { addStars,getAllreviews, addreview ,getAllStars};
