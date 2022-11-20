/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import ChartType from "./chartType";
import Accordion from "@mui/material/Accordion";
import Button from "@mui/material/Button";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RangeSlider from "./slider";
import data from "../DATA/data";
import years from "../DATA/years";
import { Chart } from "react-google-charts";
import chartNames from "./chartNames";
import Import from "../IMPORT/Import";
import Maps from "../MAPS/maps";

export const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [startDate, setStartDate] = useState(1960);
  const [endDate, setEndDate] = useState(2020);
  const [country, setCountry] = useState("USA");
  const [crops, setCrops] = useState(false);
  const [yields, setYield] = useState(false);
  const [imports, setImports] = useState(false);
  const [timeSeries, setTimeSeries] = useState(true);
  // const [annotations, setAnnotations] = useState([]);
  // const [newAnnotation, setNewAnnotation] = useState("");
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

  // useEffect(() => {
  //   setLS();
  // }, []);

  const getDateRange = async (dates) => {
    await setStartDate(dates[0]);
    await setEndDate(dates[1]);
  };

  const getCrops = async () => {
    await setTimeSeries(false);
    await setCrops(true);
    await setYield(false);
    await setImports(false);
  };

  const getYields = async () => {
    await setTimeSeries(false);
    await setCrops(false);
    await setYield(true);
    await setImports(false);
  };
  const getImports = async () => {
    await setTimeSeries(false);
    await setCrops(false);
    await setYield(false);
    await setImports(true);
  };
  const getTimeSeries = async () => {
    await setTimeSeries(true);
    await setCrops(false);
    await setYield(false);
    await setImports(false);
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
  const setLS = () => {
    localStorage.setItem("Annotations", []);
  };
  const pushAnnotation = async (val) => {
    let list = localStorage.getItem("Annotations");
    console.log("THIS", list);
    if (list === "") list = [];
    list.push(val);
    await setAnnotations(list);
    await localStorage.setItem("Annotations", list);
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
      <div
      //  style={{ backgroundColor: "brown" }}
      >
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
            {timeSeries && (
              <>
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
                    <ChartType
                      draggable
                      name={chartNames.Debt.TotalDebtService}
                    />
                    <ChartType draggable name={chartNames.Debt.DebtGNI} />
                  </AccordionDetails>
                </Accordion>
              </>
            )}

            <Button style={styles.buttonStyle} onClick={() => getCrops()}>
              Crops
            </Button>
            <br />
            <Button style={styles.buttonStyle} onClick={() => getImports()}>
              Import/Export
            </Button>
            <Button style={styles.buttonStyle} onClick={() => getYields()}>
              Yield
            </Button>
            {timeSeries === false && (
              <Button
                style={styles.buttonStyle}
                onClick={() => getTimeSeries()}
              >
                TimeSeries
              </Button>
            )}
          </div>
          <div
            className="column"
            ref={dropRef}
            style={{
              backgroundColor: "aliceblue",
              width: "1000px",
              height: "1000px",
              marginLeft: "2%",
            }}
          >
            {timeSeries && (
              <>
                <div className="row">
                  <div className="column" style={{ width: "80%" }}>
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
                  {/* <div className="column" style={{ marginTop: "3%" }}>
                    <textarea
                      rows="6"
                      cols="33"
                      onChange={(e) => setNewAnnotation(e.target.value)}
                    ></textarea>
                    <br />
                    <button
                      style={{
                        width: "100px",
                        height: "25px",
                        color: "#0096FF",
                        backgroundColor: "white",
                        borderColor: "#0096FF",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        margin: "5%",
                        fontWeight: "bold",
                      }}
                      onClick={() => pushAnnotation()}
                    >
                      Save
                    </button>
                    <div style={{ height: "50px", width: "50px" }}>
                      {annotations.map((a, i) => (
                        <>{a}</>
                      ))}
                    </div>
                  </div> */}
                </div>
              </>
            )}
            {yields && (
              <>
                <div>YIELD WILL DISPLAY HERE</div>
              </>
            )}
            {crops && (
              <>
                {/* THIS */}
                <Maps />
              </>
            )}
            {imports && (
              <>
                <Import />
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Basket;
const styles = {
  buttonStyle: {
    width: "200px",
    color: "#0096FF",
    backgroundColor: "white",
    borderColor: "#0096FF",
    borderStyle: "solid",
    borderWidth: "1px",
    margin: "5%",
    fontWeight: "bold",
  },
};
