import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import berlinPlaces from '../data/berlin';
import CoworkingList from './CoworkingList';

let map;
let places = {};

places.type = "FeatureCollection"
places.features = berlinPlaces;

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export default class CoworkingMap extends Component {
    constructor(props) {
        super(props);

        this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleCardClick(key) {
        let clickedPlace = places.features[key];

        flyToPlace(clickedPlace);

        createPopUp(clickedPlace);

        // @todo[m]: highlight card in sidebar, remove highlight from all other cards
    }

    componentDidMount() {
        map = new mapboxgl.Map({
            container: this.mapContainer,
            center: [13.392, 52.523],
            zoom: 12,
            style: 'mapbox://styles/mapbox/dark-v9'
        });

        map.addControl(new mapboxgl.NavigationControl());

        map.loadImage('http://localhost:8081/build/images/marker.png', function (error, image) {
            if (error) throw error;
            map.addImage('marker', image);
        });

        map.on('load', (e) => {
            map.addSource('places', {
                type: 'geojson',
                data: places
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
        });

        map.on('click', 'places', function (e) {
            map.getCanvas().style.cursor = 'pointer';

            let currentPlace = e.features[0];

            flyToPlace(currentPlace);

            createPopUp(currentPlace);

            // @todo[m]: highlight card in sidebar, remove highlight from all other cards
        });

        map.on('mouseenter', 'places', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
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
                    <CoworkingList
                        places={places}
                        onCardClick={this.handleCardClick}
                    />
                </div>
            </div>
        );
    }
}

function flyToPlace(currentPlace) {
    map.flyTo({
        center: currentPlace.geometry.coordinates,
        zoom: 15
    });
}

function createPopUp(currentPlace) {
    let popUps = document.getElementsByClassName('mapboxgl-popup');

    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]) popUps[0].remove();

    let coordinates = currentPlace.geometry.coordinates;
    let title = currentPlace.properties.name;
    let address = formatAddress(currentPlace.properties.address);


    new mapboxgl.Popup({closeOnClick: true})
        .setLngLat(coordinates)
        .setHTML('<h3>' + title + '</h3>' +
            '<p>' + address + '</p>')
        .addTo(map);
}


function formatAddress(address) {
    let strings = [];

    if (typeof address === 'string') {
        address = JSON.parse(address);
    }

    if (address.street) {
        strings.push(address.street);
    }

    if (address.postcode) {
        strings.push(address.postcode);
    }

    if (address.city) {
        strings.push(address.city);
    }

    return strings.join(', ');
}