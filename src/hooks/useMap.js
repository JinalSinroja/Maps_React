import TileLayer from "ol/layer/Tile";
import { useEffect, useRef } from "react";
import { Map, View } from "ol";
import { OSM, Vector as VectorSource } from "ol/source";
import { Fill, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";

const useMap = (mapId) => {
  const ref = useRef(null);
  useEffect(() => {
    const map = new Map({
      target: mapId,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    ref.current = map;
  }, [mapId]);

  const addGeoTaggedLayer = (geoJSON) => {
    console.log("geo", geoJSON);
    const geoJSONFormat = new GeoJSON();
    const features = geoJSONFormat.readFeatures(geoJSON, {
      dataProjection: "EPSG:4326", // GeoJSON projection
      featureProjection: "EPSG:3857", // Map projection (Web Mercator)
    });
    const geoJsonLayer = new VectorLayer({
      source: new VectorSource({
        features,
      }),
      style: [
        new Style({
          fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
          }),
        }),
      ],
    });

    // Add GeoJSON layer to the map
    ref.current.addLayer(geoJsonLayer);
    console.log("layers", ref.current.getAllLayers());
  };

  return {
    addGeoTaggedLayer,
  };
};

export default useMap;
