import React, {Component} from 'react';

export default class CoworkingList extends Component {
    render() {
        const {places} = this.props;

        return (
            <div className="full-height">
                <h1>Coworking spaces</h1>
                <ul className="list-group">
                    {places.features.map((place, key) => (
                        <li key={key} className="list-group-item">
                            <h5>{place.properties.name}</h5>
                            <p>{place.properties.address.street}</p>
                            <a href={place.properties.website} target="_blank">website</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}