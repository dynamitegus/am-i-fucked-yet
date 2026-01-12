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
import vicEmergencyData from '../../public/geojson.json';
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
/*
  const pins = useMemo(
    () =>
      vicEmergencyData.map((features.geometry.type, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );*/
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
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      <Source type="geojson" data={allData}>
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

/*
{pins}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            {popupInfo.city}, {popupInfo.state} |{" "}
            <a
              target="_new"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
            >
              Wikipedia
            </a>
          </div>
          <img width="100%" src={popupInfo.image} />
        </Popup>
      )}
*/
