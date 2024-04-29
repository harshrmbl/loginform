import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const MapComponent: React.FC = () => {
    useEffect(() => {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;


        const map = new Map({
            target: mapElement,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 3
            })
        });


        return () => {
            map.setTarget();
        };
    }, []);
    return <div id="map" ></div>;
}

export default MapComponent;
