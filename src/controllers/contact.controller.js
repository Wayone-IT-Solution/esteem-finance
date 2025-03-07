import ContactService from "#services/contact";
import Controller from "#controllers/base";

class ContactController extends Controller {
  static Service = ContactService;
}

export default ContactController;
