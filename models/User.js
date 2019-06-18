"use strict";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKay: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },  
        lastName: {
            type: DataTypes.STRING,
        },
        emailAddress: {
            type: DataTypes.STRING,
        }, 
        password: {
            type: DataTypes.STRING,
        }
    });

    User.associate = models => {
        User.hasMany(models.Course);
    };
    /*User.associate = (models) => {
        models.User.hasMany(models.Course, {
            foreignKey: 'userId',
        });
        
    };
    */

    return User;
};