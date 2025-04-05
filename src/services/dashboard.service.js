import { Sequelize } from "sequelize";
import Contact from "#models/contact";
import LoanQuery from "#models/loanQuery";
import LoanApplication from "#models/loanApplication";

class DashboardService {
  static async get() {
    const loanCountData = await LoanQuery.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });

    const leadCountData = await LoanApplication.findAll({
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

    let totalLeads = 0;
    const leadData = leadCountData.reduce((acc, row, index) => {
      const raw = row.toJSON();
      acc[raw.status] = raw.count;
      totalLeads += raw.count;
      return acc;
    }, {});
    leadData.total = totalLeads;

    return {
      loanData,
      leadData,
      contactCountData,
    };
  }
}

export default DashboardService;
