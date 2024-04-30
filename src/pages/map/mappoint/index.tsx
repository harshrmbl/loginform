import React, { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';

import './index.scss';
import { useMapContext } from '../mapcontext';

const Mappoint: React.FC = () => {
    const { longitude, latitude, setLongitude, setLatitude } = useMapContext();

    useEffect(() => {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        const map = new Map({
            target: mapElement,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([longitude, latitude]),
                zoom: 3,
            }),
        });

        const markerSource = new VectorSource();
        const markerLayer = new VectorLayer({
            source: markerSource,
            style: new Style({
                image: new Icon({
                    src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                    scale: 0.6,
                }),
            }),
        });
        map.addLayer(markerLayer);

        const updateMarker = () => {
            const coords = fromLonLat([longitude, latitude]);
            const marker = new Feature({
                geometry: new Point(coords),
            });
            markerSource.clear();
            markerSource.addFeature(marker);
            map.getView().setCenter(coords);
        };

        updateMarker();

        return () => {
            map.setTarget();
        };
    }, [longitude, latitude]);

    return (
        <div>
            <div className="input-container">
                <label htmlFor="longitude">Longitude:</label>
                <input
                    type="number"
                    id="longitude"
                    placeholder="Enter Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(Number(e.target.value))}
                />
            </div>
            <div className="input-container">
                <label htmlFor="latitude">Latitude:</label>
                <input
                    type="number"
                    id="latitude"
                    placeholder="Enter Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(Number(e.target.value))}
                />
            </div>
            <div id="map" className="map"></div>
        </div>
    );
}

export default Mappoint;
