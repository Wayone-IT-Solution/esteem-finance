import Service from "#services/base";
import LoanQuery from "#models/loanQuery";
import httpStatus from "#utils/httpStatus";
import UserService from "#services/user";
import { generateRandomPassword } from "#utils/jwt";
import { session } from "#middlewares/session";
import LoanApplicationService from "#services/loanApplication";

class LoanQueryService extends Service {
  static Model = LoanQuery;

  static async create(loanQueryData) {
    const { loanApplicationId } = loanQueryData;

    if (!loanApplicationId) {
      throw {
        status: false,
        message: "LoanApplication ID is required",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }

    loanQueryData.status = "Pending";
    const loanQuery = new this.Model(loanQueryData);
    await loanQuery.validate();
    if (loanQueryData.tradeCar) {
      const { vehicleVariant, kmDriven } = loanQueryData;

      if (!vehicleVariant || !kmDriven) {
        throw {
          status: false,
          message: "All fields related to car trade are required",
          httpStatus: httpStatus.BAD_REQUEST,
        };
      }
    }

    if (loanQueryData.homeOwnerShip === "NO") {
      loanQueryData.homeOwnerShip = "Rent";
    }
    if (loanQueryData.nzWorkStatus === "YES") {
      loanQueryData.nzWorkStatus = true;
    } else {
      loanQueryData.nzWorkStatus = false;
    }

    await this.Model.create(loanQueryData);
    await LoanApplicationService.update(loanApplicationId, {
      status: "Completed",
    });
    return loanQuery;
  }

  static async update(id, loanQueryData) {
    delete loanQueryData.leadId;
    delete loanQueryData.userId;

    if (loanQueryData.homeOwnerShip === "NO") {
      loanQueryData.homeOwnerShip = "Rent";
    }
    if (loanQueryData.nzWorkStatus === "YES") {
      loanQueryData.nzWorkStatus = true;
    } else {
      loanQueryData.nzWorkStatus = false;
    }

    const data = await super.update(id, loanQueryData);
    return data;
  }
}

export default LoanQueryService;
