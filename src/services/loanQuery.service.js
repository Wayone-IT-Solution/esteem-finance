import Service from "#services/base";
import LoanQuery from "#models/loanQuery";
import UserService from "#services/user";
import { generateRandomPassword } from "#utils/jwt";
import { session } from "#middlewares/session";

class LoanQueryService extends Service {
  static Model = LoanQuery;

  static async create(loanQueryData) {
    //const { userId } = loanQueryData;
    //
    //if (!userId) {
    //  throw {
    //    status: false,
    //    message: "User Id is required",
    //    httpStatus: httpStatus.BAD_REQUEST,
    //  };
    //}

    loanQueryData.status = "In Progress";
    const loanQuery = new this.Model(loanQueryData);
    await loanQuery.validate();
    if (loanQueryData.tradeCar) {
      const {
        tradeCar,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        vehicleVariant,
        kmDriven,
      } = loanQueryData;

      if (
        !tradeCar ||
        !vehicleMake ||
        !vehicleModel ||
        !vehicleYear ||
        !vehicleVariant ||
        !kmDriven
      ) {
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
