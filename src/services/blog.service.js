import Blog from "#models/blog";
import Service from "#services/base";

class BlogService extends Service {
  static Model = Blog;
}

export default BlogService;
