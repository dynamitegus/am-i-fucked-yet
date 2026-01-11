'use client'
import * as React from 'react';
import {useState, useEffect, useMemo, useCallback} from 'react';
import {createRoot, type Container} from 'react-dom/client';
import {Map, Source, Layer} from 'react-map-gl/maplibre';
import ControlPanel from './control-panel';

import {dataLayer} from './map-style';
import {updatePercentiles} from './utils';
import type { JSONArray, JSONObject, JSONValue } from 'node_modules/superjson/dist/types';

export default function App() {
  const [year, setYear] = useState(2015);
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch(
      'https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson'
    )
      .then(resp => resp.json())
      .then(json => setAllData(json))// eslint-disable-line
      .catch(err => console.error('Could not load data', err)); 
  }, []);

  const onHover = useCallback((event: { features: JSONArray; point: { x: number; y: number; }; }) => {
    const {
      features,
      point: {x, y}
    } = event;
    const hoveredFeature: JSONValue = features?.[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  const data = useMemo(() => {
    return allData && updatePercentiles(allData, f => f.properties.income[year]);
  }, [allData, year]);

  return (
    <div>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3
        }}
        mapStyle="https://tiles.versatiles.org/assets/styles/colorful/style.json"
        interactiveLayerIds={['data']}
        onMouseMove={onHover}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
        {hoverInfo && (
          <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
            <div>State: {hoverInfo.feature.properties.name}</div>
            <div>Median Household Income: {hoverInfo.feature.properties.value}</div>
            <div>Percentile: {(hoverInfo.feature.properties.percentile / 8) * 100}</div>
          </div>
        )}
      </Map>

      <ControlPanel year={year} onChange={(value: React.SetStateAction<number>) => setYear(value)} />
    </div>
  );
}

export function renderToDom(container: Container) {
  createRoot(container).render(<App />);
}