import React, {useState, useEffect} from 'react';
import './App.css';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import  * as myStore from "./data/grocery.json"


function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 38.9072,
    longitude: -77.0369,
    zoom: 9
  });

  const  [selectedStore, setSelectedStore] = useState(null);

  useEffect( () => {
    const listener = e => {
      if(e.key === "Escape"){
        setSelectedStore(null);
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
        mapStyle = "mapbox://styles/nazifyusof/ck94r3k0410051jo5xlpyycx5"
        onViewportChange = {viewport => {
          setViewport(viewport);
        }}
      >
        {myStore.storeList.map((store) => (

          (store.STORENAME === "Safeway") ?

          (<Marker key = {store.OBJECTID} latitude = {store.Y}   
          longitude = {store.X}
          >
            <button className= "marker-btn" onClick= {(e)=>{
              e.preventDefault();
              setSelectedStore(store);
            }}>
              <img src = "/Safeway.jpeg" alt ="store"/> 
            </button>
          </Marker> ) 

          : ( store.STORENAME === "Walmart Supercenter" ? 
          (<Marker key = {store.OBJECTID} latitude = {store.Y}   
            longitude = {store.X}
            >
              <button className= "marker-btn" onClick= {(e)=>{
                e.preventDefault();
                setSelectedStore(store);
              }}>
                <img src = "/walmart.jpeg" alt ="store"/> 
              </button>
            </Marker> )
          :  (store.STORENAME === "Whole Foods" ?  
          (<Marker key = {store.OBJECTID} latitude = {store.Y}   
            longitude = {store.X}
            >
              <button className= "marker-btn" onClick= {(e)=>{
                e.preventDefault();
                setSelectedStore(store);
              }}>
                <img src = "/wholefood.jpeg" alt ="store"/> 
              </button>
            </Marker> )
            : (store.STORENAME === "Giant" ?  
            (<Marker key = {store.OBJECTID} latitude = {store.Y}   
              longitude = {store.X}
              >
                <button className= "marker-btn" onClick= {(e)=>{
                  e.preventDefault();
                  setSelectedStore(store);
                }}>
                  <img src = "/Giant.jpeg" alt ="store"/> 
                </button>
              </Marker> )
            : 
          (<Marker key = {store.OBJECTID} latitude = {store.Y}   
            longitude = {store.X}
            >
              <button className= "marker-btn" onClick= {(e)=>{
                e.preventDefault();
                setSelectedStore(store);
              }}>
                <img src = "/other.jpeg" alt ="store"/> 
              </button>
            </Marker> ))))

           

          // <Marker key = {store.OBJECTID} latitude = {store.Y}   
          // longitude = {store.X}
          // >
          //   <button className= "marker-btn" onClick= {(e)=>{
          //     e.preventDefault();
          //     setSelectedStore(store);
          //   }}>
          //     <img src = "/Safeway.jpeg" alt ="store"/> 
          //   </button>
          // </Marker>
        )
        )}

        {selectedStore ? (
          <Popup
            latitude={selectedStore.Y}
            longitude={selectedStore.X}
            onClose = {() =>{
              setSelectedStore(null);
            }}
          >
            <div>
              <h2> {selectedStore.STORENAME}</h2>
              <p> {selectedStore.ADDRESS}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;