const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const owner=sequelize.define('Comments',{
    
        Comment:{type:DataTypes.STRING},     
    })
        return owner;
};
