const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const player=sequelize.define('players',{
        FullName:{type:DataTypes.STRING},
        Email:{type:DataTypes.STRING},
        Password:{type:DataTypes.STRING},
        Points:{type:DataTypes.INTEGER},
        ProfileImage:{type:DataTypes.TEXT('long')},   
    })
        return player;
};