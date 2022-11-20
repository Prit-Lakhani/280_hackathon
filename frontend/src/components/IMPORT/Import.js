import React, { useEffect, useState, useReducer } from "react";
// import Navigation from "../Navigation/Navigation"; //Need to replace it with our Navigation Part code line - 86
// import SideNavigation from "../SideNavigation/SideNavigation"; //Need to replace it with our SideNavigation Panel - code line 89
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-google-charts";
import Axios from "axios";
import "./Import.css";
var data = require("./importgrains.json");

function Import(props) {
  const [country, setCountry] = useState("select country");
  const [year, setYear] = useState("select year");
  const [crop, setCrop] = useState("select crop");
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const [sankeyData, setData] = useState([]);
  const [pieData, setPiedData] = useState([]);

  useEffect(() => {
    // getDataFunction().then((data)=>{
    //     console.log(data);
    //     const yearData = data[0].year1;
    //     //console.log(country)
    // })
  });

  const getDataFunction = () => {
    console.log(data);
    if (country == "Egypt") {
      return Promise.resolve(data["Egypt"]);
    } else {
      return Promise.resolve(data["SaudiArabia"]);
    }
  };

  const setDataFunc = (country1, year1, crop1) => {
    setCountry(country1);
    setYear(year1);
    setCrop(crop1);
    getDataFunction(country1).then((data) => {
      let yearData = [];
      if (year1 == "2019") {
        yearData = data[0]["year1"];
      } else {
        yearData = data[0]["year2"];
      }
      let filteredData = [];
      let filteredData2 = [];
      filteredData.push(["Country", "ImportCountry", "Quantity"]);
      filteredData2.push(["Country", "Quantity"]);
      for (let i = 0; i < yearData.length; i++) {
        let arr = [];
        let arr2 = [];
        if (
          yearData[i].Item + "" === crop1 &&
          parseInt(yearData[i].Quantity) != 0
        ) {
          arr.push(country);
          arr.push(yearData[i].Country);
          arr.push(parseInt(yearData[i].Quantity));
          console.log(arr);

          arr2.push(yearData[i].Country);
          arr2.push(parseInt(yearData[i].Quantity));

          filteredData.push(arr);
          filteredData2.push(arr2);
        }
      }
      setData(filteredData);
      setPiedData(filteredData2);
    });
  };

  return (
    <div>
      {/* <Navigation /> */}
      <div className="layout-imp">
        {/* <SideNavigation /> */}

        <div>
          <div className="display-drop">
            <div></div>
            <div className="display-grid">
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {country}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      value="Egypt"
                      onClick={(e) => {
                        setDataFunc("Egypt", year, crop);
                      }}
                    >
                      Egypt
                    </Dropdown.Item>
                    <Dropdown.Item
                      value="Saudi"
                      onClick={(e) => {
                        setDataFunc("SaudiArabia", year, crop);
                      }}
                    >
                      Saudi Arabia
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {year}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={(e) => setDataFunc(country, "2019", crop)}
                      value="2019"
                    >
                      2019
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => setDataFunc(country, "2020", crop)}
                      value="2020"
                    >
                      2020
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {crop}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={(e) => setDataFunc(country, year, "Wheat")}
                      value="Wheat"
                    >
                      Wheat
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => setDataFunc(country, year, "Rice")}
                      value="Rice"
                    >
                      Rice
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="grid-charts">
            <div className="chart1">
              {sankeyData.length !== 0 && (
                <Chart
                  width={400}
                  height={"350px"}
                  chartType="Sankey"
                  loader={<div>Loading Chart</div>}
                  data={sankeyData}
                  rootProps={{ "data-testid": "1" }}
                />
              )}
            </div>
            <div className="chart2">
              {pieData.length !== 0 && (
                <Chart
                  width={400}
                  height={"350px"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={pieData}
                  rootProps={{ "data-testid": "1" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Import;
