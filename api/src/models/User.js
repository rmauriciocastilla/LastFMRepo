const {DataTypes} = require('sequelize');

module.exports = (s)=>{
    s.define('User',{
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('user','admin'),
            defaultValue: 'user' 
        }
    },
    {
        timestamps: false
    })
}