const db = require('../index.js');
const Owner = db.Owner;


module.exports = {

CreateOwner: async (req,res) => {
const {Fireid,FullName,PhoneNumber,patentImage,ProfileImage}= req.body;
   try {
const owner = await Owner.create({
        Fireid,
        FullName,
        PhoneNumber,
        patentImage,
        ProfileImage,

    }) 
    res.status(200).json(owner);
} catch (err) {console.log(err);}
},

getOwner : async (req, res) => {
    const {Fireid}=req.params;
   console.log("fire iddddddddddddddddd",req.params);
    try{
   
    const owner = await Owner.findAll({
        where:{
            Fireid:Fireid}})
            res.status(201).json(owner);
        
} catch(err){console.log(err);}

}


}