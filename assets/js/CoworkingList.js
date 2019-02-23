import React, {Component} from 'react';
import CoworkingMenu from './CoworkingMenu';
import places from "../data/places";

const totalSpaces = Object.keys(places.features).length;

export default class CoworkingList extends Component {
    render() {
        const {places, onCardClick, activeCardId} = this.props;

        return (
            <>
                <div className="p-4">
                    <h1>Coworking spaces</h1>

                    <CoworkingMenu />

                    <p>{totalSpaces} spaces</p>
                </div>
                <ul className="list-group list-group-flush">
                    {places.features.map((place, key) => (
                        <li key={key}
                            className={activeCardId === key ? 'list-group-item active' : 'list-group-item'}
                            id={key}
                            onClick={() => onCardClick(key)}
                        >
                            <h5>{place.properties.name}</h5>
                            <p className="address">{place.properties.address.street}, {place.properties.address.postcode}, {place.properties.address.city}</p>

                            <ul className="rates list-inline">
                                {place.properties.rates.day.length > 0 &&
                                <li className="list-inline-item"><span>{place.properties.rates.day}€</span> Day</li>}
                                {place.properties.rates.flex.length > 0 &&
                                <li className="list-inline-item"><span>{place.properties.rates.flex}€</span> Flex</li>}
                                {place.properties.rates.fixed.length > 0 &&
                                <li className="list-inline-item"><span>{place.properties.rates.fixed}€</span> Fixed</li>}
                            </ul>

                            <a href={place.properties.website} target="_blank"><i className="fas fa-external-link-alt"></i></a>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}