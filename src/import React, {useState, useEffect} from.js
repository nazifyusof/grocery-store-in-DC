import React, {useState, useEffect} from 'react';
import './App.css';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import  * as parkDate from "./data/csvjson.json"
// import  * as parkDate from "./data/park.json"

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 45.4215,
    longitude: -75.6972,
    zoom: 9
  });

  const  [selectedPark, setSelectedPark] = useState(null);

  useEffect( () => {
    const listener = e => {
      if(e.key === "Escape"){
        setSelectedPark(null);
      }
    } ;
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    }
  }, []);

  return (
    <div>
      <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle = "mapbox://styles/nazifyusof/ck8yr9a1o056i1js10ote57xi"
        onViewportChange = {viewport => {
          setViewport(viewport);
        }}
      >
        {parkDate.features.map((park) => (
          <Marker key = {park.PARK_ID} latitude = {park.Y}   //using csvjson.json
          longitude = {park.X}
          // <Marker key = {park.properties.PARK_ID} latitude = {park.geometry.coordinates[1]}
          // longitude = {park.geometry.coordinates[0]}
          >
            <button className= "marker-btn" onClick= {(e)=>{
              e.preventDefault();
              setSelectedPark(park);
            }}>
              <img src = "/skateboarding.svg" alt ="skate icon"/> 
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.Y}
            longitude={selectedPark.X}
            // latitude={selectedPark.geometry.coordinates[1]}
            // longitude={selectedPark.geometry.coordinates[0]}
            onClose = {() =>{
              setSelectedPark(null);
            }}
          >
            <div>
              
              <h2> {selectedPark.NAME}</h2>
              <p> {selectedPark.ADDRESS}</p>
              {/* <h2> {selectedPark.properties.NAME}</h2>
              <p> {selectedPark.properties.ADDRESS}</p> */}
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;
