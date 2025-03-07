import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class NewsLetterEmail extends BaseModel {}

NewsLetterEmail.initialize({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: true,
  },
});

export default NewsLetterEmail;
