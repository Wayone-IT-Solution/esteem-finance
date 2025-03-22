import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Contact extends BaseModel {}

Contact.initialize({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING(500),
  },
  message: {
    type: DataTypes.TEXT,
  },
});

export default Contact;
