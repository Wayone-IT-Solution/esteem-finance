import Controller from "#controllers/base";
import LoanQueryService from "#services/loanQuery";

class LoanQueryController extends Controller {
  static Service = LoanQueryService;
}

export default LoanQueryController;
