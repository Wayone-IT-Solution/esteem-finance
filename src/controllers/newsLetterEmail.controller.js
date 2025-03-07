import NewsLetterEmailService from "#services/newsLetterEmail";
import Controller from "#controllers/base";

class NewsLetterEmailController extends Controller {
  static Service = NewsLetterEmailService;
}

export default NewsLetterEmailController;
