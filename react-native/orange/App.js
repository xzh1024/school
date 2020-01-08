import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import './src/utils/Global';
import {Router} from "./src/router/Router";

const App = createAppContainer(Router);

export default App;
