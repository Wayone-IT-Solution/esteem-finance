import User from "#models/user";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Lead extends BaseModel {}

Lead.initialize(
  {
    leadNumber: {
      type: DataTypes.STRING,
    },
    userType: {
      type: DataTypes.ENUM("Business", "Individual"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: User.primaryKeyAttribute,
      },
    },
    title: {
      type: DataTypes.ENUM("Mr", "Mrs", "Ms", "Dr"),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    callbackRequested: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    hooks: {
      afterCreate: async function (leadInstance) {
        leadInstance.leadNumber = `LEAD NO-${leadInstance.id}`;
        await leadInstance.save();
      },
    },
  },
);

export default Lead;
