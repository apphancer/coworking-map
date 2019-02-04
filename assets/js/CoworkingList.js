import React, {Component} from 'react';

export default class CoworkingList extends Component {
    render() {
        const {places, onCardClick, activeCardId} = this.props;

        const totalSpaces = Object.keys(places.features).length;

        return (
            <div className="full-height">
                <div className="p-4">
                    <h1>Coworking spaces</h1>
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
                            <a href={place.properties.website} target="_blank">website</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}