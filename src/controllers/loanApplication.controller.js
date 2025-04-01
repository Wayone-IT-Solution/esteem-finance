import LoanApplicationService from "#services/loanApplication";
import Controller from "#controllers/base";

class LoanApplicationController extends Controller {
  static Service = LoanApplicationService;
}

export default LoanApplicationController;
