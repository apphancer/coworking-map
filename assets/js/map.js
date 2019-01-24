import React from 'react';
import {render} from 'react-dom';
import mapboxgl from 'mapbox-gl';
import berlinData from '../data/berlin';

let placesData = {};
placesData.type = "FeatureCollection"
placesData.features = [];

for (let key in berlinData) {
    let place = {
        properties: {
            name: berlinData[key].name,
            website: berlinData[key].url,
            description: berlinData[key].notes,
        },
        address: {
            street: berlinData[key].address,
            postcode: '',
            city: 'Berlin',
        },
        prices: {
            day: berlinData[key].cost_day,
            flex: berlinData[key].cost_flex,
            fixed: berlinData[key].cost_fixed,
        },
        geometry: {
            type: 'Point',
            coordinates:
                [
                    berlinData[key].lng,
                    berlinData[key].lat,
                ]
        }
    }

    placesData.features.push(place);
}


class Application extends React.Component {
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
                data: placesData
            });

            map.loadImage('/coworking-map/web/marker.png', function (error, image) {
                if (error) throw error;
                map.addImage('marker', image);
            });

            map.addLayer({
                id: 'places',
                source: 'places',
                type: 'symbol',
                layout: {
                    'icon-image': 'marker'
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

            // map.getSource('places').setData(placesData);
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.children !== this.props.children ||
            nextState.map !== this.state.map
        )
    }

    render() {
        const items = placesData.features;

        return (
            <div className="row">
                <div className="col-8">
                    <div className="map-wrapper">
                        <div ref={el => this.mapContainer = el} className="map" id="map"/>
                    </div>
                </div>
                <div className="col-4">
                    <h1>Coworking spaces</h1>
                    <ul className="list-group scrollable">
                        {items.map(function (item, key) {
                            return (
                                <li key={key} className="list-group-item">
                                    <h5>{item.properties.name}</h5>
                                    <p>{item.address.street}</p>
                                    <a href={item.properties.website} target="_blank">website</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

render(<Application/>, document.getElementById('app'));