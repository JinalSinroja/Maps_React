import { useEffect, useRef } from "react";
import "./App.css";
import "ol/ol.css";
import MyMap from "./components/MyMap";
import useMap from "./hooks/useMap";

function App() {
  const mapRef = useRef(null);
  console.log("mapr", mapRef);
  const { addGeoTaggedLayer } = useMap(mapRef.current);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const geoJSONData = JSON.parse(e.target.result);
        addGeoTaggedLayer(geoJSONData);
      };
      reader.readAsText(file);
    }
  };
  console.log("maeee", mapRef);
  return (
    <div className="outer">
      <MyMap ref={mapRef} />
      <label htmlFor="file-upload" className="custom-file-upload">
        <i className="fa fa-cloud-upload"></i>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/JSON"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default App;
