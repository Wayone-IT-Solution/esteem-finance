import LeadService from "#services/lead";
import Controller from "#controllers/base";

class LeadController extends Controller {
  static Service = LeadService;
}

export default LeadController;
