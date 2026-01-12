"use client";
import * as React from "react";
import { Map, Source, Layer } from "react-map-gl/maplibre";
import { useState, useEffect, useMemo, useCallback } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import * as vicEmegencyData from "/geojson.json";
import * as dataLayer from "./map-style";

export default function App() {
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch("/geojson.json")
      .then((resp) => resp.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);
  return (
    <Map
      initialViewState={{
        longitude: 144.9464,
        latitude: -37.8409,
        zoom: 6,
      }}
      interactiveLayerIds={["data"]}
      style={{ width: 1200, height: 500 }}
      mapStyle="https://tiles.versatiles.org/assets/styles/colorful/style.json"
    >
      <Source type="geojson" data={allData}>
        <Layer {...dataLayer.warnings("Minor", "N")} />
        <Layer {...dataLayer.warnings("Moderate", "N")} />
        <Layer {...dataLayer.warnings("Extreme", "N")} />
        <Layer {...dataLayer.warnings("Unknown", "N")} />
      </Source>
    </Map>
  );
}
