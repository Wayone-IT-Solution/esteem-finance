import Blog from "#models/blog";
import Service from "#services/base";

class BlogService extends Service {
  static Model = Blog;

  static async update(id, data) {
    delete data.slug;

    return await super.update(id, data);
  }
}

export default BlogService;
