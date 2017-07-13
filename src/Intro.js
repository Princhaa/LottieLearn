import React, { Component } from 'react';
import { Text, StyleSheet, Animated, Image, Easing, FlatList, ActivityIndicator, Platform, UIManager } from 'react-native';
import Animation from 'lottie-react-native';
import { View } from 'react-native-animatable';
import { Observable } from 'rx-lite'

import metrics from './config/metrics';
import CustomTextInput from './components/CustomTextInput';
import SteamUser from './components/SteamUser';

export default class Intro extends Component {

    static navigationOptions = {
        title: 'Intro',
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isAppLoading: true,
            animation: new Animated.Value(250),
            imageOffset: new Animated.Value(0),
            searchBarOffset: new Animated.Value(0),
            searchBarOpacity: new Animated.Value(0),
            isAnimationCompleted: false,
            steamId: null,
            data: null,
            dataLoaded: true
        }
    }

    componentDidMount() {
        this.animation.play();
        if (Platform.OS == 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    displaySearchBar() {
        Animated.timing(
            this.state.searchBarOpacity,
            {
                toValue: 1,
            }
        ).start(() => this.setState({ isAnimationCompleted: true }))
    }

    expand() {
        Animated.stagger(300, [
            Animated.decay(
                this.state.animation,
                {
                    velocity: 2.6,
                    deceleration: 0.994
                }
            )
        ]).start(() => this.displaySearchBar())

    }

    renderListView() {
        if (this.state.dataLoaded){
            return (
                <View style={styles.listView}>
                    <FlatList 
                        data = {this.state.data}
                        renderItem = {(item) => 
                            <SteamUser 
                                name = {item.item.personaname}
                                image = {item.item.avatarfull}
                                index = {item.index}
                                onPress = {() => this.props.navigation.navigate('main', {steamId: item.item.account_id})}
                            />
                        }
                        keyExtractor = {(item, index) => index}
                    />
                </View>
            )
        } else {
            return (
                <View style = {styles.listView}>
                    <ActivityIndicator color = 'white' size = 'large'/>
                </View>
            )
        }
    }

    retreiveUsers(username) {
        this.setState({ dataLoaded: false })
        console.log(username);
        fetch(metrics.BASE_URL + '/search?q=' + username, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ data: responseJson, dataLoaded: true })
            })
    }

    renderContent() {
        if (this.state.isAppLoading == true) {
            setTimeout(() => {
                this.setState({ isAppLoading: false })
            }, 2000)
            return (
                <View style={styles.animation}>
                    <Animation
                        loop={true}
                        ref={animation => { this.animation = animation }}
                        style={styles.animation}
                        source={require('../animations/appLoading.json')}
                    />
                </View>
            )
        } else {
            return (
                <View animation='zoomIn' delay={600} duration={800}>
                    <Animated.View style={[styles.search, { height: this.state.animation }]}>
                        <View animation={'fadeIn'} delay={1000} duration={1500} onAnimationEnd={() => this.expand()} style={{ alignItems: 'center', }}>
                            <Animated.View style={{ justifyContent: 'center', marginTop: 55 }}>
                                <Image
                                    style={{ width: 150, height: 150, resizeMode: 'contain'}}
                                    source={require("../assets/dota2logo.png")}
                                />
                            </Animated.View>
                        </View>
                        <Animated.View style={{ opacity: this.state.searchBarOpacity, marginTop: 20 }}>
                            <CustomTextInput
                                placeholder={'Insert Steam Username'}
                                style={styles.textInput}
                                onChangeText={(e) => this.setState({ steamId: e })}
                                onBlur = {() => this.retreiveUsers(this.state.steamId)}
                            />
                            {this.renderListView()}
                        </Animated.View>
                    </Animated.View>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    animation: {
        width: 200,
        height: 200
    },

    search: {
        width: metrics.DEVICE_WIDTH,
        borderRadius: 10,
        backgroundColor: 'black',
        alignItems: 'center',
    },

    textInput: {
        backgroundColor: '#FFF',
        width: metrics.DEVICE_WIDTH * 0.8,
        borderRadius: 5,
        marginBottom: 10
    },

    listView: {
        height: metrics.DEVICE_HEIGHT * 0.5,
        width: metrics.DEVICE_WIDTH * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    }
})