import Blog from "#models/blog";
import Service from "#services/base";
import slugify from "slugify";

class BlogService extends Service {
  static Model = Blog;

  static async create(data) {
    if (data.title) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    return await super.create(data);
  }

  static async update(id, data) {
    if (data.title) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    return await super.update(id, data);
  }
}

export default BlogService;
