import FaqService from "#services/faq";
import Controller from "#controllers/base";

class FaqController extends Controller {
  static Service = FaqService;
}

export default FaqController;
