const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const terrain=sequelize.define('terrains',{
          Name:{type:DataTypes.STRING},
          Price:{type:DataTypes.INTEGER},
          Description:{type:DataTypes.STRING},
          Location:{type:DataTypes.STRING},
          Region:{type:DataTypes.STRING},
          Category:{type:DataTypes.STRING},
          Images:{type:DataTypes.TEXT('long')},
          Capacity:{type:DataTypes.INTEGER},
          Aviabilty:{type:DataTypes.BOOLEAN},
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          }
    })
        return terrain;
};