/* eslint-disable */
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ChartType from "./chartType";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Basket = () => {
  const [basket, setBasket] = useState([]);
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

  return (
    <React.Fragment>
      <div className="container">
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
                <ChartType draggable name="GDP(USD)" />
                <ChartType draggable name="FDI Inflows (USD)" />
                <ChartType draggable name="FDI Outflows (USD)" />
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
                <ChartType draggable name="Contribution of Agri (%GDP)" />
                <ChartType draggable name="Credit" />
                <ChartType draggable name="Fretilizers" />
                <ChartType draggable name="Fretilizers PROD" />
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
                <ChartType draggable name="Total Debt" />
                <ChartType draggable name="GNI" />
                <ChartType draggable name="Reserves" />
              </AccordionDetails>
            </Accordion>
          </div>
          <div
            className="column"
            ref={dropRef}
            style={{
              backgroundColor: "aliceblue",
              width: "800px",
              height: "600px",
              marginLeft: "3%",
            }}
          >
            {basket.map((pet) => (
              // render chart here. use switch case to update chart data
              // <ChartType name={pet.name} />
              <>{pet.name}</>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Basket;
