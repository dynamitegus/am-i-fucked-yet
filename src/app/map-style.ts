import type { LayerProps } from "react-map-gl/maplibre";

// For more information on data-driven styles, see https://maplibre.org/maplibre-style-spec/expressions/
export const unknown: LayerProps = {
  id: "unknown",
  type: "fill",
  filter: [
    "all",
    [
      "case",
      ["==", ["get", "status"], "Unknown"],
      ["!=", ["get", "statewide"], "Y"],
      false
    ],
  ],
  paint: {
    "fill-opacity": 0.3,
    "fill-color": "rgba(0, 255, 0, 1)",
  },
};
export const minor: LayerProps = {
  id: "minor",
  type: "fill",
  filter: [
    "all",
    [
      "case",
      ["==", ["get", "status"], "Minor"],
      ["!=", ["get", "statewide"], "Y"],
      false,
    ],
  ],
  paint: {
    "fill-opacity": 0.3,
    "fill-color": "rgba(0, 0, 255, 1)",
  },
};
export const moderate: LayerProps = {
  id: "moderate",
  type: "fill",
  filter: [
    "all",
    [
      "case",
      ["==", ["get", "status"], "Moderate"],
      ["!=", ["get", "statewide"], "Y"],
      false,
    ],
  ],
  paint: {
    "fill-opacity": 0.3,
    "fill-color": "#fc6f03",
  },
};
export const extreme: LayerProps = {
  id: "extreme",
  type: "fill",
  filter: [
    "all",
    [
      "case",
      ["==", ["get", "status"], "Extreme"],
      ["!=", ["get", "statewide"], "Y"],
      false,
    ],
  ],
  paint: {
    "fill-opacity": 0.3,
    "fill-color": "rgba(255, 0, 0, 1)",
  },
};
