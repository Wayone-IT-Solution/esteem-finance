import Lead from "#models/lead";
import User from "#models/user";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";
import httpStatus from "#utils/httpStatus";
import LoanApplication from "#models/loanApplication";

class LoanQuery extends BaseModel {}

LoanQuery.initialize(
  {
    loanQueryNumber: {
      type: DataTypes.STRING,
      editable: false,
    },
    //userId: {
    //  type: DataTypes.INTEGER,
    //  references: {
    //    model: User,
    //    key: User.primaryKeyAttribute,
    //  },
    //  allowNull: false,
    //},
    //leadId: {
    //  type: DataTypes.INTEGER,
    //  references: {
    //    model: Lead,
    //    key: Lead.primaryKeyAttribute,
    //  },
    //},
    userType: {
      type: DataTypes.ENUM("Business", "Individual"),
      allowNull: false,
    },
    loanApplicationId: {
      type: DataTypes.INTEGER,
      references: {
        model: LoanApplication,
        key: LoanApplication.primaryKeyAttribute,
      },
    },
    loanAppliedFor: {
      type: DataTypes.ENUM("Car", "Van", "Others"),
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    loanTerm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paymentFrequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    depositAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    applicationType: {
      type: DataTypes.ENUM("Single", "Joint"),
      allowNull: false,
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    partnerMaritalStatus: {
      type: DataTypes.STRING,
    },
    dependents: {
      type: DataTypes.ENUM("1", "2", "3", "4+"),
      allowNull: false,
    },
    partnerDependents: {
      type: DataTypes.ENUM("1", "2", "3", "4+"),
    },
    driverLicenseType: {
      type: DataTypes.ENUM(
        "Type 1",
        "Type 2",
        "Learner",
        "International",
        "Restricted",
        "Full",
        "Overseas",
      ),
      allowNull: false,
    },
    partnerDriverLicenseType: {
      type: DataTypes.ENUM(
        "Type 1",
        "Type 2",
        "Learner",
        "Restricted",
        "Full",
        "Overseas",
      ),
    },
    driverLicenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    partnerDriverLicenseNumber: {
      type: DataTypes.STRING,
    },
    driverLicenseVersion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    partnerDriverLicenseVersion: {
      type: DataTypes.STRING,
    },
    driverLicenseDocument: {
      type: DataTypes.STRING,
      file: true,
    },
    partnerDriverLicenseDocument: {
      type: DataTypes.STRING,
      file: true,
    },
    nzWorkStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    nzResidentType: {
      type: DataTypes.ENUM(
        "NZ Citizen",
        "NZ Resident",
        "World Wide Visa",
        "Australia",
      ),
    },
    birthCountry: {
      type: DataTypes.STRING,
    },
    citizenshipDetails: {
      type: DataTypes.JSON,
      validate: {
        isValidJson(value) {
          if (!Array.isArray(value) || !value.length) {
            throw {
              status: false,
              message:
                "Citizenship details must be an array containing citizenship details",
              httpStatus: httpStatus.BAD_REQUEST,
            };
          }

          for (const key of value) {
            if (!key.length) {
              throw {
                status: false,
                message: "Country of citizenship should be a valid country",
                httpStatus: httpStatus.BAD_REQUEST,
              };
            }
          }
        },
      },
    },
    homeOwnership: {
      type: DataTypes.ENUM("Owned", "Rent"),
      allowNull: false,
    },
    rentAgreement: {
      type: DataTypes.STRING,
      file: true,
    },
    employerName: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
    },
    employmentType: {
      type: DataTypes.ENUM(
        "Full-Time",
        "Part-Time",
        "Casual",
        "Benificiary",
        "Super-Annuation",
      ),
    },
    timeInThisJob: {
      type: DataTypes.INTEGER,
      min: 1,
    },
    paidFrequency: {
      type: DataTypes.ENUM("Bi-Weekly", "Weekly", "Monthly"),
    },
    takeHomeIncome: {
      type: DataTypes.DECIMAL(10, 2),
    },
    incomeType: {
      type: DataTypes.ENUM("Weekly", "Fourth Night", "Monthly"),
    },
    partnerPaidFrequency: {
      type: DataTypes.ENUM("Bi-Weekly", "Weekly", "Monthly"),
    },
    partnerTakeHomeIncome: {
      type: DataTypes.DECIMAL(10, 2),
    },
    otherIncome: {
      type: DataTypes.BOOLEAN,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    companyAddress: {
      type: DataTypes.STRING,
    },
    typeOfEmployee: {
      type: DataTypes.ENUM("Salaried", "Self Employed"),
    },
    dateOfJoining: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM("Approved", "Disapproved", "In Progress", "Pending"),
      allowNull: false,
      default: "Pending",
    },
    comments: {
      type: DataTypes.TEXT,
    },
    tradeCar: {
      type: DataTypes.BOOLEAN,
    },
    vehicleMake: {
      type: DataTypes.STRING,
    },
    vehicleModel: {
      type: DataTypes.STRING,
    },
    vehicleYear: {
      type: DataTypes.INTEGER,
    },
    vehicleVariant: {
      type: DataTypes.STRING,
    },
    kmDriven: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0, // Ensure it's a positive number
      },
    },
    disApprovalReason: {
      type: DataTypes.STRING(500),
    },
    approvedBankData: {
      type: DataTypes.JSON,
      validate: {
        customValidator(value) {
          if (value === undefined || value === null) return;

          if (typeof value !== "object") {
            throw {
              status: false,
              message: "approvedBankData must be a valid json",
              httpStatus: httpStatus.BAD_REQUEST,
            };
          }

          const { banks, recommendedBank } = value;

          if (!Array.isArray(banks)) {
            throw {
              status: false,
              message: "Banks must be an array",
              httpStatus: httpStatus.BAD_REQUEST,
            };
          }

          if (!recommendedBank) {
            throw {
              status: false,
              message: "Recommended bank is required",
              httpStatus: httpStatus.BAD_REQUEST,
            };
          }

          banks.forEach((ele, index) => {
            if (!ele.name) {
              throw {
                status: false,
                message: `Bank name at index ${index} is missing`,
                httpStatus: httpStatus.BAD_REQUEST,
              };
            }
            if (
              ele.interestRate === null ||
              ele.interestRate === undefined ||
              Number(ele.interestRate) < 0
            ) {
              throw {
                status: false,
                message: "Interest rate is required",
                httpStatus: httpStatus.BAD_REQUEST,
              };
            }

            if (
              ele.tenure === null ||
              ele.tenure === undefined ||
              Number(ele.tenure) <= 0
            ) {
              throw {
                status: false,
                message: "Tenue is required",
                httpStatus: httpStatus.BAD_REQUEST,
              };
            }

            if (
              ele.amount === null ||
              ele.amount === undefined ||
              Number(ele.amount) <= 0
            ) {
              throw {
                status: false,
                message: "Amount is required",
                httpStatus: httpStatus.BAD_REQUEST,
              };
            }
          });
        },
      },
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    postalCode: {
      type: DataTypes.STRING,
    },
    timeAtCurrentAddressInYears: {
      type: DataTypes.INTEGER,
    },
    timeAtCurrentAddressInMonths: {
      type: DataTypes.INTEGER,
    },
    country: {
      type: DataTypes.STRING,
    },
    previousAddress: {
      type: DataTypes.STRING,
    },
    previousCity: {
      type: DataTypes.STRING,
    },
    previousPostalCode: {
      type: DataTypes.STRING,
    },
    previousTimeAtCurrentAddressInYears: {
      type: DataTypes.INTEGER,
    },
    previousTimeAtCurrentAddressInMonths: {
      type: DataTypes.INTEGER,
    },
    previousCountry: {
      type: DataTypes.STRING,
    },
    residentType: {
      type: DataTypes.ENUM("Boarding", "Renting", "Owning"),
    },
    creditCardLimit: {
      type: DataTypes.DECIMAL(10, 2),
    },
    creditCardMonthlyPayments: {
      type: DataTypes.DECIMAL(10, 2),
    },
    loanBalance: {
      type: DataTypes.DECIMAL(10, 2),
    },
    loanMonthlyPayments: {
      type: DataTypes.DECIMAL(10, 2),
    },
    livingExpenses: {
      type: DataTypes.DECIMAL(10, 2),
    },
    utilities: {
      type: DataTypes.DECIMAL(10, 2),
    },
    motorVehicle: {
      type: DataTypes.DECIMAL(10, 2),
    },
    totalMonthlyPayment: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        customValidator(value) {
          const pass =
            //this.value ===
            this.creditCardMonthlyPayments +
            this.loanMonthlyPayments +
            this.livingExpenses +
            this.utilities +
            this.motorVehicle;

          if (pass != value) {
            throw {
              status: false,
              httpStatus: httpStatus.BAD_REQUEST,
              message:
                "Total monthly payment must match the sum of all the monthly payments",
            };
          }
        },
      },
    },
  },
  {
    hooks: {
      afterCreate: async (loanQueryInstance) => {
        loanQueryInstance.loanQueryNumber = `LOAN-NO-${loanQueryInstance.id}`;
        await loanQueryInstance.save();
      },
    },
  },
);

//Lead.hasMany(LoanQuery, {
//  foreignKey: "leadId",
//  as: "loanQueries",
//});
//
//User.hasMany(LoanQuery, {
//  foreignKey: "userId",
//  as: "loanQueries",
//});
//

export default LoanQuery;
