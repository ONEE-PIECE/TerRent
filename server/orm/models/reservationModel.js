const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const reservation=sequelize.define('reservations',{
        Day:{type:DataTypes.DATE},
        Hour:{type:DataTypes.TIME},
        Reserved:{type:DataTypes.BOOLEAN},
        
    })
        return reservation;
};