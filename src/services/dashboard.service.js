import LoanQuery from "#models/loanQuery";
import { Sequelize } from "sequelize";
import Service from "#services/base";

class DashboardService {
  static async get() {
    const counts = await LoanQuery.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });
    const response = counts.reduce((acc, row, index) => {
      const raw = row.toJSON();
      acc[raw.status] = raw.count;
      return acc;
    }, {});

    return response;
  }
}

export default DashboardService;
