const { sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const owner=sequelize.define('owners',{
        Fireid:{type:DataTypes.STRING,
            primaryKey: true,
            allowNull: false,

},
        FullName:{type:DataTypes.STRING},
        PhoneNumber:{type:DataTypes.INTEGER},
        patentImage:{type:DataTypes.TEXT('long')},
        ProfileImage:{type:DataTypes.TEXT('long')},
        AccountConfirmation:{type:DataTypes.BOOLEAN}
       
    })
        return owner;
};
