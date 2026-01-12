import type { LayerProps } from "react-map-gl/maplibre";

// For more information on data-driven styles, see https://maplibre.org/maplibre-style-spec/expressions/
export function warnings(status: string, statewide: string): LayerProps {
  let colour = "#00ff00";
  if (status == "Extreme") {
    colour = "#ff0000";
  } else if (status == "Moderate") {
    colour = "#fc6f03";
  } else if (status == "Minor")  {
    colour = "#fcad03"
  } else if (status == "Unknown") {
    colour = "#03fcc2"
  }

const warning: LayerProps = {
  id: "extreme",
  type: "fill",
  filter: [
    "all",
    [
      "case",
      ["==", ["get", "status"], status],
      ["!=", ["get", "statewide"], statewide],
      false,
    ],
  ],
  paint: {
    "fill-opacity": 0.3,
    "fill-color": colour,
  },
};
return(warning);
};
