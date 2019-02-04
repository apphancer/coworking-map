import React, {Component} from 'react';

export default class CoworkingList extends Component {
    render() {
        const {places, onCardClick, activeCardId} = this.props;

        const totalSpaces = Object.keys(places.features).length;

        return (
            <div className="full-height">
                <h1>Coworking spaces</h1>
                <p>{totalSpaces} spaces</p>
                <ul className="list-group">
                    {places.features.map((place, key) => (
                        <li key={key}
                            className={activeCardId === key ? 'list-group-item active' : 'list-group-item'}
                            id={key}
                        >
                            <h5
                                onClick={() => onCardClick(key)}
                            >{place.properties.name}</h5>
                            <p>{place.properties.address.street}, {place.properties.address.postcode}, {place.properties.address.city}</p>
                            <a href={place.properties.website} target="_blank">website</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}