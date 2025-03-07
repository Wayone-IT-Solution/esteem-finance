import DashboardService from "#services/dashboard";
import Controller from "#controllers/base";

class DashboardController extends Controller {
  static Service = DashboardService;
}

export default DashboardController;
