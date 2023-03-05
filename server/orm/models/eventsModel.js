const { sequelize, DataTypes } = require("sequelize");


module.exports=(sequelize,DataTypes)=>{
    const events=sequelize.define('events',{
        EventName:{type:DataTypes.STRING},
        Description:{type:DataTypes.STRING},
        Date:{type:DataTypes.DATE},
        Price:{type:DataTypes.DECIMAL},
        Media:{type:DataTypes.TEXT('long')},
        createdAt: {
              type: DataTypes.DATE,
              defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
              type: DataTypes.DATE,
              defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            }  
    })
        return events;
};


