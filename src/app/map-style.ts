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

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-size": 12,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
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
