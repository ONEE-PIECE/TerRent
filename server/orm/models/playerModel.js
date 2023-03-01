const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const player=sequelize.define('players',{
        FirstName:{type:DataTypes.STRING},
        SecondName:{type:DataTypes.STRING},
        UserName:{type:DataTypes.STRING},
        Email:{type:DataTypes.STRING},
        Password:{type:DataTypes.STRING},
        Points:{type:DataTypes.INTEGER},
        ProfileImage:{type:DataTypes.TEXT('long')},   
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          }
    })
        return player;
}; 