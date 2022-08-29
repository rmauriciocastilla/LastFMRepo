const {DataTypes} = require('sequelize');

module.exports = (s)=>{
    s.define('Compra',{
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        track: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        status:{
            type: DataTypes.ENUM('cancel','success','pending'),
            defaultValue: 'pending'
        }
    })
}