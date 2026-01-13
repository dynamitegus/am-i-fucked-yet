import type { LayerProps } from "react-map-gl/maplibre";

// For more information on data-driven styles, see https://maplibre.org/maplibre-style-spec/expressions/
export function warnings(
  status: string,
  statewide: string,
  colour: string,
  opacity = 0.3,
): LayerProps {
  const warning: LayerProps = {
    id: status + statewide,
    type: "fill",
    filter: [
      "all",
      ["==", ["get", "status"], status],
      ["==", ["get", "statewide"], statewide],
    ],
    paint: {
      "fill-opacity": opacity,
      "fill-color": colour,
    },
  };
  return warning;
}

export const incidents: LayerProps = {
  id: "incidents",
  type: "circle",
  filter: [
        "any",
        ['==', '$type', 'Point'],
  ],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};
