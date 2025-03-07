import { Sequelize } from "sequelize";
import Service from "#services/base";
import Contact from "#models/contact";
import LoanQuery from "#models/loanQuery";

class DashboardService {
  static async get() {
    const loanCountData = await LoanQuery.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });

    const contactCountData = await Contact.count({
      distinct: true,
      col: "email",
    });

    let totalLoan = 0;
    const loanData = loanCountData.reduce((acc, row, index) => {
      const raw = row.toJSON();
      acc[raw.status] = raw.count;
      totalLoan += raw.count;
      return acc;
    }, {});
    loanData.total = totalLoan;

    return {
      loanData,
      contactCountData,
    };
  }
}

export default DashboardService;
