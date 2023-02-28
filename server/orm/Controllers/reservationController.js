const db = require('../index.js');
const Reservation=db.Reservation
  const sendAppointment= async(req, res)=> {
  try {
// console.log(req.body, "================");
// console.log("hiiiiiiiiiiiiiiiiii");
    const { playerId, terrainId } = req.params;
    const { Day, Hour, Reserved } = req.body;

    // Create a new reservation record
    const reservation = await Reservation.create({
      Day,
      Hour,
      Reserved,
      PlayerId: playerId,
      TerrainId: terrainId,
    });
    // Return the newly created reservation record
    res.status(201).json(reservation);
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).send(error)
  }
}

const getAllReservationForAspecialTerrain=async(req,res)=>{
  try{
    const {terrainId}=req.params
    const query=await Reservation.findAll({where:{terrainId:terrainId}}) 
    res.status(200).json(query)
  }
  catch(err){
    console.log(err);
  }
}

const confirmTheReservationSentByTheUser=async(req,res)=>{
  try{
    const {reservationId}=req.params
    const query=await Reservation.update({
      Reserved:true
    },
    {
      where:{id:reservationId}
    })
    res.status(200).json(query)
  }
  catch(err){
    console.log(err);
  }
}
const deleteReservation=async(req,res)=>{
  try{
    const {reservationId}=req.params
    const query =await Reservation.destroy({
      where :{id:reservationId}
    })
    res.status(200).send('item deleted')
  }
  catch(err){
    console.log(err);
  }
}

 module.exports = { deleteReservation,confirmTheReservationSentByTheUser,getAllReservationForAspecialTerrain,sendAppointment };



