import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';

import Intro from './Intro';
import Main from './Main';

const App = StackNavigator({
    intro: { screen: Intro },
    main: { screen: Main }
}, {
    cardStyle: {
        paddingTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight
    },
    headerMode: 'screen'
})

export default App;