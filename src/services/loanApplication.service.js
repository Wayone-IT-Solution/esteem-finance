import LoanApplication from "#models/loanApplication";
import Service from "#services/base";

class LoanApplicationService extends Service {
  static Model = LoanApplication;
}

export default LoanApplicationService;
