import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Faq extends BaseModel {}

Faq.initialize({
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
  },
});

export default Faq;
