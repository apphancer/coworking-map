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
                    <h1>Berlin Coworking</h1>
                    <h4>{totalSpaces} spaces</h4>
                    <CoworkingMenu
                        modeStatus={this.props.modeStatus}
                        onModeChange={this.props.onModeChange}
                    />
                </div>
                <ul className="list-group list-group-flush">
                    {places.features.map((place, key) => (
                        <li key={key}
                            className={activeCardId === key ? 'list-group-item active' : 'list-group-item'}
                            id={key}
                            onClick={() => onCardClick(key)}
                        >
                            <h3>{place.properties.name}</h3>
                            <p className="address">{place.properties.address.street}, {place.properties.address.postcode}, {place.properties.address.city}</p>

                            <ul className="rates list-inline">
                                {place.properties.rates.day.length > 0 &&
                                <li className="list-inline-item"><span>{place.properties.rates.day}€</span> Day</li>}
                                {place.properties.rates.flex.length > 0 &&
                                <li className="list-inline-item"><span>{place.properties.rates.flex}€</span> Flex</li>}
                                {place.properties.rates.fixed.length > 0 &&
                                <li className="list-inline-item"><span>{place.properties.rates.fixed}€</span> Fixed
                                </li>}
                            </ul>

                            <a href={place.properties.website} target="_blank"><i className="fas fa-external-link-alt"></i></a>
                        </li>
                    ))}
                </ul>
                <div className="p-4">Made with <span className="text-primary">❤</span> by <a href="https://www.apphancer.com">apphancer</a> &#8226; <a href="https://twitter.com/apphancer"><i className="fab fa-twitter"></i></a>  &#8226; <a href=""><i className="fab fa-github"></i> Errors?</a>
                </div>
            </>
        );
    }
}