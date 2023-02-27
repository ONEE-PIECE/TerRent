const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const owner=sequelize.define('owners',{
        FullName:{type:DataTypes.STRING},
        PhoneNumber:{type:DataTypes.INTEGER},
        Date:{type:DataTypes.DATE},
        patentImage:{type:DataTypes.TEXT('long')},
        Email:{type:DataTypes.STRING},
        Password:{type:DataTypes.STRING},
        ProfileImage:{type:DataTypes.TEXT('long')},   
    })
        return owner;
};