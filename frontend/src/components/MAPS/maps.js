import { React, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Circle,
} from "@react-google-maps/api";
import "./maps.css";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDlsGObmInjb8NMAcOkF9H7keSr1v_t_d0",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <LoadMap />;
};

function LoadMap() {
  // const crops = ["Banana", "Mangoes", "Walunts"];
  const [dropdownstate, setdropdownstate] = useState("Banana");

  const china = [
    {
      id: 1,
      name: "Guandong",
      position: { lat: 23.12841, lng: 120.619957 },
    },
    {
      id: 2,
      name: "Guangxi",
      position: { lat: 23.64407, lng: 108.26651 },
    },
    {
      id: 3,
      name: "Yunnan",
      position: { lat: 25.181129, lng: 101.864143 },
    },
    {
      id: 4,
      name: "Hainan",
      position: { lat: 19.2000001, lng: 109.5999999 },
    },
  ];
  const indonesia = [
    {
      id: 1,
      name: "Lampung",
      position: { lat: -4.8555039, lng: 105.0272986 },
    },
    {
      id: 2,
      name: "East Java",
      position: { lat: -7.6977397, lng: 112.4914199 },
    },
    {
      id: 3,
      name: "West Java",
      position: { lat: -6.88919049, lng: 107.6404716 },
    },
    {
      id: 4,
      name: "Papua",
      position: { lat: -2.4749149, lng: 138.08485 },
    },
  ];
  const philipines = [
    {
      id: 1,
      name: "Pangasinan",
      position: { lat: 6.1244, lng: 120.9838 },
    },
    {
      id: 2,
      name: "Davao City",
      position: { lat: 7.0648306, lng: 125.6080623 },
    },
    {
      id: 3,
      name: " Cotabato Province",
      position: { lat: 7.0616878, lng: 124.968034 },
    },
    {
      id: 4,
      name: "Mindanao Visayas",
      position: { lat: 7.64784075, lng: 125.17171313357011 },
    },
    {
      id: 5,
      name: " Visayas",
      position: { lat: 10.89925685, lng: 123.01894327152783 },
    },
  ];
  const india = [
    {
      id: 1,
      name: "Andhra Pradesh",
      position: { lat: 15.9240905, lng: 80.1863809 },
    },
    {
      id: 2,
      name: "Tirupati",
      position: { lat: 13.6316368, lng: 79.4231711 },
    },
    {
      id: 3,
      name: "Visakhapatnam",
      position: { lat: 17.7231276, lng: 83.3012842 },
    },
  ];
  const california = [
    {
      id: 1,
      name: "San Joaquin",
      position: { lat: 37.9372901, lng: -121.2773719 },
    },
    {
      id: 2,
      name: "Sacramento Valleys",
      position: { lat: 38.584163, lng: -121.5007543 },
    },
  ];
  const iran = [
    {
      id: 1,
      name: "Kerman",
      position: { lat: 30.2924085, lng: 57.0645647 },
    },
    {
      id: 2,
      name: "Kermanshah",
      position: { lat: 34.3239414, lng: 47.0735891 },
    },
    {
      id: 3,
      name: "Hamedan",
      position: { lat: 34.7983271, lng: 48.5148499 },
    },
    {
      id: 4,
      name: "Boyerahmad",
      position: { lat: 30.6576579, lng: 51.59711530358355 },
    },
    {
      id: 5,
      name: "Lorestan",
      position: { lat: 33.5372643, lng: 48.2435197 },
    },
    {
      id: 6,
      name: "Khorasan Razavi",
      position: { lat: 35.4795009, lng: 59.0237291 },
    },
    {
      id: 7,
      name: "Bakhtiari",
      position: { lat: 29.752243, lng: 54.1955312 },
    },
    {
      id: 8,
      name: "West Azerbaijan Province,",
      position: { lat: 37.7416484, lng: 45.0207638 },
    },
    {
      id: 9,
      name: "East Azerbaijan Province",
      position: { lat: 37.9211202, lng: 46.6821517 },
    },
    {
      id: 10,
      name: "Markazi",
      position: { lat: 34.5302705, lng: 49.7864561 },
    },
  ];

  const [map1_markers, setMap1_markers] = useState([...china]);
  const [map2_markers, setMap2_markers] = useState([...indonesia]);
  const [map1Name, setmap1Name] = useState("China");
  const [map2Name, setmap2Name] = useState("Indonesia");

  const myfun = (v) => {
    console.log(v);
    setdropdownstate(v);
    if (v === "Banana") {
      setMap1_markers([...china]);
      setMap2_markers([...indonesia]);
      setmap1Name("China");
      setmap2Name("Indonesia");
    }
    if (v === "Mangoes") {
      setMap1_markers([...philipines]);
      setMap2_markers([...india]);
      setmap1Name("Philipins");
      setmap2Name("India");
    }
    if (v === "Walnuts") {
      setMap1_markers([...california]);
      setMap2_markers([...iran]);
      setmap1Name("California");
      setmap2Name("Iran");
    }
  };

  console.log("drop down vaue :", dropdownstate);
  console.log("Crops : ", dropdownstate);

  const defaultOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  return (
    <div className="main">
      <span style={{ marginTop: "15px" }}>
        <select
          name="selectList"
          id="selectList"
          style={{ marginBottom: "10px" }}
          onChange={(e) => {
            myfun(e.target.value);
          }}
          value={dropdownstate}
        >
          <option value="Banana">Banana</option>
          <option value="Mangoes">Mangoes</option>
          <option value="Walnuts">Walnuts</option>
        </select>
        <p>Selected crops: {dropdownstate}</p>
      </span>

      <div className="maps_both">
        <div id="map1" style={{ marginLeft: "30px" }}>
          <GoogleMap
            zoom={5}
            center={map1_markers[0].position}
            mapContainerClassName="map-container"
          >
            {map1_markers.map(({ id, position }) => (
              <div>
                <MarkerF position={position} />
                <Circle
                  center={position}
                  radius={15000}
                  options={defaultOptions}
                />
              </div>
            ))}
          </GoogleMap>
          <h2>{map1Name}</h2>
        </div>

        <div id="map2" style={{ marginLeft: "30px", marginRight: "30px" }}>
          <GoogleMap
            zoom={5}
            center={map2_markers[0].position}
            mapContainerClassName="map-container"
          >
            {map2_markers.map(({ id, position }) => (
              <div>
                <MarkerF position={position} />
                <Circle
                  center={position}
                  radius={15000}
                  options={defaultOptions}
                />
              </div>
            ))}
          </GoogleMap>
          <h2>{map2Name}</h2>
        </div>
      </div>
    </div>
  );
}

export default Map;
