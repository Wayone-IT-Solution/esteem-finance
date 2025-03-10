import slugify from "slugify";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Blog extends BaseModel {}

Blog.initialize(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING(500),
      file: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    metaTitle: {
      type: DataTypes.STRING(1000),
    },
    metaDescription: {
      type: DataTypes.TEXT,
    },
    slug: {
      type: DataTypes.STRING,
    },
    metaKeywords: {
      type: DataTypes.JSON,
      validate: {
        customValidator(value) {
          if (!Array.isArray(value)) {
            throw {
              status: false,
              message: "meta keywords should be in an array",
              httpStatus: httpStatus.BAD_REQUEST,
            };
          }
          value.forEach((ele, index) => {
            value[index] = ele?.toString();
            if (!ele.length || typeof ele !== "string") {
              throw {
                status: false,
                message: "each item should be a valid keyword",
                httpStatus: httpStatus.BAD_REQUEST,
              };
            }
          });
        },
      },
    },
  },
  {
    hooks: {
      async afterCreate(blogInstance) {
        blogInstance.slug = slugify(blogInstance.title, {
          lower: true,
          strict: true,
          trim: true,
        });
        blogInstance.slug += new Date();
        await blogInstance.save();
      },
    },
  },
);

export default Blog;
