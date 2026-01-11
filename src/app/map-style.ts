import type { LayerProps } from "react-map-gl/maplibre";

// For more information on data-driven styles, see https://maplibre.org/maplibre-style-spec/expressions/
export const dataLayer: LayerProps = {
  id: "data",
  type: "fill",
  "filter": [
    "any",
    [
      "case",
      [
        "==",
        [
          "typeof",
          ["get", "sourceTitle"]
        ],
        "string"
      ],
      [
        "==",
        ["get", "sourceTitle"],
        "Emergency Warning"
      ],
      false
    ]
  ],
  "paint": {
    "fill-opacity": 0.3,
    "fill-color": "rgba(255, 0, 0, 1)"
  }
}
