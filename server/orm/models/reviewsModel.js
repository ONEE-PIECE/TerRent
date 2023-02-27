const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const review=sequelize.define('reviews',{
        Comments:{type:DataTypes.STRING},
        Rating:{type:DataTypes.INTEGER},
      
          
    })
        return review;
};
