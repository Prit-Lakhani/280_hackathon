/* eslint-disable */

const chartNames = {
  MacroEconomics: {
    GDPGrowthRange: "GDP Growth Range",
    GDPCurrent: "GDP Current",
    CurrentAccountBalance: "Current Account Balance",
    FDINetCurrent: "FDI Net Current",
    FDINetIn: "FDI Net Inflows",
    FDINetOut: "FDI Net Outflows",
    FDINetOutflows: "FDI Net Outflows (%GDP)",
  },
  Agricultural: {
    AgriContribution: "Contribution of Agri (%GDP)",
    AgriManufacture: "Manufacturing (%GDP)",
    AgriForfish: "Agriculture, forestry, fishing (value added)",
    AgriFertilizerKG: "Fertilizer consumption (kgs/hectare)",
    AgriFertilizerPercent: "Fertilizer consumption (% fertilizer production)",
  },
  Debt: {
    TotalReserveMonths: "Total reserves in months of imports",
    TotalReserveCurrent: "Total reserves (current)",
    TotalReservePercent: "Total reserves (% total extnl debt)",
    DebtService:
      "Debt service (% exports of goods, services and primary income)",
    TotalDebtService: "Total debt service (% of GNI)",
    DebtGNI: "GNI (current US$)",
  },
};
Object.freeze(chartNames);

module.exports = chartNames;
