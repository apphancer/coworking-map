import React from 'react';
import {render} from 'react-dom';
import CoworkingMap from './CoworkingMap';

import '../css/app.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

render(
    <CoworkingMap/>,
    document.getElementById('app')
);