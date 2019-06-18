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
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Title required"
                }
            }
        },
       description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Course description required"
                }
            }
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