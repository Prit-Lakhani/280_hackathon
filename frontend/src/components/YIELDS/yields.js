import React, { useState } from "react";
import { Chart } from "react-google-charts";
import data from "../DATA/data";
import years from "../DATA/years";

export const yielddata = [
  [{ label: "Year" }, "Tonnes", "ha"],
  [1961, 4400, 8000],
  [1962, 4400, 8000],
  [1963, 2500, 3000],
  [1964, 2500, 3000],
  [1965, 2500, 4000],
  [1966, 2500, 3000],
  [1967, 2500, 4000],
  [1968, 3000, 6000],
  [1969, 3000, 6000],
  [1970, 2000, 4000],
  [1971, 1900, 3500],
  [1972, 1800, 3200],
  [1973, 1700, 3000],
  [1974, 1600, 3300],
  [1975, 1500, 3100],
  [1976, 1500, 2800],
  [1977, 1500, 3250],
  [1978, 1500, 3000],
  [1979, 1500, 3000],
  [1980, 2200, 6000],
  [1981, 4800, 13000],
  [1982, 6283, 18197],
  [1983, 6733, 21612],
  [1984, 7468, 22996],
  [1985, 7840, 31422],
  [1986, 11347, 40930],
  [1987, 8951, 32957],
  [1988, 10544, 37821],
  [1989, 12143, 64009],
  [1990, 15025, 44482],
  [1991, 17973, 64486],
  [1992, 22208, 71237],
  [1993, 25976, 110819],
  [1994, 28975, 117218],
  [1995, 32287, 119218],
  [1996, 35781, 113185],
  [1997, 41766, 124196],
  [1998, 45152, 145145],
  [1999, 50161, 142906],
  [2000, 51971, 129276],
  [2001, 61795, 162838],
  [2002, 67194, 177673],
  [2003, 74979, 204883],
  [2004, 88888, 168320],
  [2005, 96697, 247864],
  [2006, 146010, 367445],
  [2007, 119687, 299789],
  [2008, 115919, 260355],
  [2009, 116794, 279742],
  [2010, 117603, 268135],
  [2011, 112855, 280275],
  [2012, 124843, 284421],
  [2013, 109759, 222610],
  [2014, 141019, 403158],
  [2015, 142000, 420000],
  [2016, 71425, 349192],
  [2017, 53952, 393598],
  [2018, 43946, 304040],
  [2019, 44780, 321074],
  [2020, 59920, 356666],
];

const RenderYield = ({ country, startDate, endDate }) => {
  //const [title, setTitle] = useState("Iran (Islamic Republic of) - Walnuts, in shell, Production (tonnes) and Area Harvested (hectare)");
console.log("++++++++", country);
  const countrySpecificData = () => {
    switch (country) {
      case "Iran":
        //setTitle("Iran (Islamic Republic of) - Walnuts, in shell, Production (tonnes) and Area Harvested (hectare)")
        return data.Iran;
      case "Philippines":
        //setTitle("Philippines Mango Production - Area Harvested & Production");
        return data.Philippines;
      default:
        return data.Iran;
    }
  };
  const getOptions = () => {
    const options =  {
    
      chart: {
        title:
          "Iran (Islamic Republic of) - Walnuts, in shell, Production (tonnes) and Area Harvested (hectare)",
      },
      width: 900,
      height: 500,
      series: {
        // Gives each series an axis name that matches the Y-axis below.
        0: { axis: "Tonnes" },
        1: { axis: "ha" },
      },
      axes: {
        // Adds labels to each axis; they don't have to match the axis names.
        y: {
          Temps: { label: "Tonnes" },
          Daylight: { label: "ha" },
        },
      },
  };
  return options;
  }

  const getOptions1 = () => {
    const options =  {
    
      chart: {
        title:
          "Philippines Mango Production - Area Harvested & Production",
      },
      width: 900,
      height: 500,
      series: {
        // Gives each series an axis name that matches the Y-axis below.
        0: { axis: "Tonnes" },
        1: { axis: "ha" },
      },
      axes: {
        // Adds labels to each axis; they don't have to match the axis names.
        y: {
          Temps: { label: "Tonnes" },
          Daylight: { label: "ha" },
        },
      },
  };
  return options;
  }

  

  const getData = () => {
  
    let finalData = [];
    let value = [];
    let value1 = [];
    let csd = countrySpecificData();
    value = csd.Area;
    value1 = csd.Production;
    if(country === 'Iran'){

      finalData.push(["Date", "Walnuts, in shell, Production(tonnes)", "Area Harvested (ha)"]);
    } else {
      finalData.push(["Date", "Area Harvested", "Yield"]);
    }
    value.map(async (yearValue1, i) => {
        if (years[i] >= Number(startDate) && years[i] <= Number(endDate)) {
          console.log("is it here  ----" , years[i], startDate, endDate)
          let yv = yearValue1 === "" ? 0 : Number(yearValue1);
          await finalData.push([Number(years[i]), yv , Number(value1[i])]);
        }
      });
      console.log("finaldata", finalData);
    return finalData;
  };

  const getData1 = () => {
    let finalData = [];
    let value = [];
    let value1 = [];
    let csd = countrySpecificData();
    value = csd.Area;
    value1 = csd.Yield;
    if(country === 'Iran'){

      finalData.push(["Date", "Walnuts, in shell, Production(tonnes)", "Area Harvested (ha)"]);
    } else {
      finalData.push(["Date", "Area Harvested", "Yield"]);
    }
    value.map(async (yearValue1, i) => {
        if (years[i] >= Number(startDate) && years[i] <= Number(endDate)) {
          console.log("is it here  ----" , years[i], startDate, endDate)
          let yv = yearValue1 === "" ? 0 : Number(yearValue1);
          await finalData.push([Number(years[i]), yv , Number(value1[i])]);
        }
      });
      console.log("finaldata", finalData);
    return finalData;
  };

  return (
    <div>
      <div >
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={getData()}
          options={getOptions()}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br> <br></br>
      <br></br>
      <div className="column">
        <Chart
          chartType="Line"
          width="25%"
          height="100px"
          data={getData1()}
          options={getOptions1()}
        />
      </div>
    </div>
  );
};

export default RenderYield;
