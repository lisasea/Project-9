"use strict";

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("Course", {
        id: {
            type: DataTypes.INTEGER,
            primaryKay: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
        },  
        title: {
            type: DataTypes.STRING,
        },
       description: {
            type: DataTypes.TEXT,
        }, 
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Course.associate = models => {
        Course.belongsTo(models.User);
    };

    return Course;
};