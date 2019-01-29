import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import berlinPlaces from '../data/berlin';
import CoworkingList from './CoworkingList';

let places = {};
places.type = "FeatureCollection"
places.features = berlinPlaces;

export default class CoworkingMap extends Component {
    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            center: [13.392, 52.523],
            zoom: 12,
            style: 'mapbox://styles/mapbox/dark-v9'
        });

        map.addControl(new mapboxgl.NavigationControl());

        map.on('load', (e) => {
            map.addSource('places', {
                type: 'geojson',
                data: places
            });

            map.loadImage('http://localhost:8081/build/images/marker.png', function (error, image) {
                if (error) throw error;
                map.addImage('marker', image);
            });

            map.addLayer({
                id: 'places',
                source: 'places',
                type: 'symbol',
                layout: {
                    'icon-image': 'marker',
                    'icon-size': 0.25
                }
            });

            // Create a popup, but don't add it to the map yet.
            var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('click', 'places', function (e) {
                map.getCanvas().style.cursor = 'pointer';

                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = e.features[0].properties.name;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            map.on('mouseenter', 'places', function () {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'places', function () {
                map.getCanvas().style.cursor = '';
            });

            setTimeout(function () {
                map.getSource('places').setData(places);
            }, 3000); // @todo[m]: fix issue with layer randomly displaying
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.children !== this.props.children ||
            nextState.map !== this.state.map
        )
    }

    render() {
        return (
            <div className="row full-height">
                <div className="col-8 full-height">
                    <div id="map-wrapper">
                        <div ref={el => this.mapContainer = el} className="map" id="map"/>
                    </div>
                </div>
                <div className="col-4 full-height" id="results-details">
                    <CoworkingList places={places}/>
                </div>
            </div>
        );
    }
}