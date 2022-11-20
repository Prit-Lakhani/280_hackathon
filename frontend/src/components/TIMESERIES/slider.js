/* eslint-disable */
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 1960,
    label: "1960",
  },
  {
    value: 1990,
    label: "1990",
  },
  {
    value: 1995,
    label: "1995",
  },
  {
    value: 2000,
    label: "2000",
  },
  {
    value: 2005,
    label: "2005",
  },
  {
    value: 2010,
    label: "2010",
  },
  {
    value: 2015,
    label: "2015",
  },
  {
    value: 2020,
    label: "2020",
  },
];

const RangeSlider = ({ getDateRange, startDate, endDate }) => {
  const [value, setValue] = React.useState([1960, 2020]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    await getDateRange(event.target.value);
  };

  return (
    <Box sx={{ width: 600 }}>
      <Slider
        value={value}
        marks={marks}
        min={1960}
        max={2020}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default RangeSlider;
