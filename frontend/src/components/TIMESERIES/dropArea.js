/* eslint-disable */
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ChartType from "./chartType";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RangeSlider from "./slider";
import data from "../DATA/data";
import years from "../DATA/years";
import { Chart } from "react-google-charts";
import chartNames from "./chartNames";

export const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [startDate, setStartDate] = useState(1960);
  const [endDate, setEndDate] = useState(2020);
  const [country, setCountry] = useState("USA");
  const [{ isOver }, dropRef] = useDrop({
    accept: "chartText",
    drop: (item) =>
      setBasket((basket) =>
        !basket.includes(item) ? [...basket, item] : basket
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getDateRange = async (dates) => {
    await setStartDate(dates[0]);
    await setEndDate(dates[1]);
  };

  const countrySpecificData = () => {
    switch (country) {
      case "USA":
        return data.USA;
      case "INDIA":
        return data.India;
      case "CHINA":
        return data.China;
      default:
        return data.USA;
    }
  };

  const getData = (name) => {
    console.log("Inside getData with name", name);
    let finalData = [];
    let value = [];
    let csd = countrySpecificData();
    switch (name) {
      case chartNames.MacroEconomics.GDPGrowthRange:
        value = csd.MacroEconomics.GDPGrowthRange;
        break;
      case chartNames.MacroEconomics.GDPCurrent:
        value = csd.MacroEconomics.GPDCurrentUSD;
        break;
      case chartNames.MacroEconomics.CurrentAccountBalance:
        value = csd.MacroEconomics.CurrentAccountBalance;
        break;
      case chartNames.MacroEconomics.FDINetCurrent:
        value = csd.MacroEconomics.FDINetCurrent;
        break;
      case chartNames.MacroEconomics.FDINetIn:
        value = csd.MacroEconomics.FDINetIn;
        break;
      case chartNames.MacroEconomics.FDINetOut:
        value = csd.MacroEconomics.FDINetOut;
        break;
      case chartNames.MacroEconomics.FDINetOutflows:
        value = csd.MacroEconomics.FDINetOutflows;
        break;
      //********************************** */
      case chartNames.Agricultural.AgriContribution:
        value = csd.Agricultural.AgriContribution;
        break;
      case chartNames.Agricultural.AgriManufacture:
        value = csd.Agricultural.AgriManufacture;
        break;
      case chartNames.Agricultural.AgriForfish:
        value = csd.Agricultural.AgriForfish;
        break;
      case chartNames.Agricultural.AgriFertilizerKG:
        value = csd.Agricultural.AgriFertilizerKG;
        break;
      case chartNames.Agricultural.AgriFertilizerPercent:
        value = csd.Agricultural.AgriFertilizerPercent;
        break;
      //********************************** */
      case chartNames.Debt.TotalReserveMonths:
        value = csd.Debt.TotalReserveMonths;
        break;
      case chartNames.Debt.TotalReserveCurrent:
        value = csd.Debt.TotalReserveCurrent;
        break;
      case chartNames.Debt.TotalReservePercent:
        value = csd.Debt.TotalReservePercent;
        break;
      case chartNames.Debt.DebtService:
        value = csd.Debt.DebtService;
        break;
      case chartNames.Debt.TotalDebtService:
        value = csd.Debt.TotalDebtService;
        break;
      case chartNames.Debt.DebtGNI:
        value = csd.Debt.DebtGNI;
        break;
      default:
        value = csd.MacroEconomics.GDPGrowthRange;
        break;
    }
    finalData.push(["Date", "Value"]);
    value.map(async (yearValue, i) => {
      if (years[i] >= Number(startDate) && years[i] <= Number(endDate)) {
        let yv = yearValue === "" ? 0 : Number(yearValue);
        await finalData.push([Number(years[i]), yv / 1000000000]);
      }
    });
    return finalData;
  };

  const getOptions = (name) => {
    return {
      title: `${name} per Year`,
      hAxis: {
        title: "Date",
      },
      vAxis: {
        title: "Value",
      },
      legend: "none",
    };
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row" style={{ marginLeft: "30%" }}>
          <RangeSlider getDateRange={getDateRange} />
          <select
            name="countries"
            id="countries"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              marginLeft: "10%",
              backgroundColor: "#0096FF",
              color: "white",
              fontWeight: "bolder",
              height: "30px",
            }}
          >
            <option value="USA">USA</option>
            <option value="INDIA">INDIA</option>
            <option value="CHINA">CHINA</option>
          </select>
        </div>
        <div className="row">
          <div
            className="column"
            style={{
              marginLeft: "5%",
              width: "20%",
              backgroundColor: "lightgray",
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Macroeconomics (USD)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ChartType
                  draggable
                  name={chartNames.MacroEconomics.GDPGrowthRange}
                />
                <ChartType
                  draggable
                  name={chartNames.MacroEconomics.GDPCurrent}
                />
                <ChartType
                  draggable
                  name={chartNames.MacroEconomics.CurrentAccountBalance}
                />
                <ChartType
                  draggable
                  name={chartNames.MacroEconomics.FDINetCurrent}
                />
                <ChartType
                  draggable
                  name={chartNames.MacroEconomics.FDINetIn}
                />
                <ChartType
                  draggable
                  name={chartNames.MacroEconomics.FDINetOut}
                />
                <ChartType
                  draggable
                  name={chartNames.MacroEconomics.FDINetOutflows}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Agricultural</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ChartType
                  draggable
                  name={chartNames.Agricultural.AgriContribution}
                />
                <ChartType
                  draggable
                  name={chartNames.Agricultural.AgriManufacture}
                />
                <ChartType
                  draggable
                  name={chartNames.Agricultural.AgriForfish}
                />
                <ChartType
                  draggable
                  name={chartNames.Agricultural.AgriFertilizerKG}
                />
                <ChartType
                  draggable
                  name={chartNames.Agricultural.AgriFertilizerPercent}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Debt Services</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ChartType
                  draggable
                  name={chartNames.Debt.TotalReserveMonths}
                />
                <ChartType
                  draggable
                  name={chartNames.Debt.TotalReserveCurrent}
                />
                <ChartType
                  draggable
                  name={chartNames.Debt.TotalReservePercent}
                />
                <ChartType draggable name={chartNames.Debt.DebtService} />
                <ChartType draggable name={chartNames.Debt.TotalDebtService} />
                <ChartType draggable name={chartNames.Debt.DebtGNI} />
              </AccordionDetails>
            </Accordion>
          </div>
          <div
            className="column"
            ref={dropRef}
            style={{
              backgroundColor: "aliceblue",
              width: "800px",
              height: "1000px",
              marginLeft: "3%",
            }}
          >
            {basket.map((pet) => (
              <>
                <div style={{ marginLeft: "5%", marginTop: "2%" }}>
                  <Chart
                    chartType="LineChart"
                    data={getData(pet.name)}
                    options={getOptions(pet.name)}
                    width="90%"
                    height="200px"
                    legendToggle
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Basket;
