"use client";
import * as React from "react";
import {
  Map,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl/maplibre";
import { useState, useEffect, useMemo, useCallback } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import * as VICEMERGENCYDATA from "../../public/geojson.json";
import * as dataLayer from "./map-style";
import Pin from "./pin";

export default function App() {
  const [allData, setAllData] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
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
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="https://tiles.versatiles.org/assets/styles/colorful/style.json"
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      <Source type="geojson" data={allData}>
        <Layer {...dataLayer.clusterLayer} />
        <Layer {...dataLayer.clusterCountLayer} />
        <Layer {...dataLayer.unclusteredPointLayer} />
        <Layer {...dataLayer.warnings("Minor", "N", "#fcad03")} />
        <Layer {...dataLayer.warnings("Moderate", "N", "#fc6f03")} />
        <Layer {...dataLayer.warnings("Extreme", "N", "#ff0000")} />
        <Layer {...dataLayer.warnings("Unknown", "N", "#03fcc2")} />
        <Layer {...dataLayer.warnings("Minor", "Y", "#6e6e6e", 0.1)} />
        <Layer {...dataLayer.warnings("Moderate", "Y", "#fc6f03", 0.1)} />
        <Layer {...dataLayer.warnings("Extreme", "Y", "#ff0000", 0.1)} />
        <Layer {...dataLayer.warnings("Unknown", "Y", "#6e6e6e", 0.1)} />
      </Source>
    </Map>
  );
}
