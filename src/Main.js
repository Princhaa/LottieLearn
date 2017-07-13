import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import metrics from './config/metrics';

export default class Main extends Component {

    static navigationOptions = {
        title: 'Your profile'
    }

    constructor(props){
        super(props);
        this.state = {
            steamId: props.navigation.state.params.steamId,
            name: null,
            solo_mmr: null,
            party_mmr: null,
            dataLoaded: false
        }
    }

    componentDidMount(){
        fetch(metrics.BASE_URL+'/players/'+this.state.steamId, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                dataLoaded: true,
                name: responseJson.profile.personaname,
                solo_mmr: responseJson.solo_competitive_rank,
                party_mmr: responseJson.competitive_rank
            })
        })
    }

    renderData(){
        if(this.state.dataLoaded) {
            return (
                <View>
                    <Text>{this.state.name}</Text>
                    <Text>{this.state.solo_mmr}</Text>
                    <Text>{this.state.party_mmr}</Text>  
                </View>
            )
        } else {
            return (
                <ActivityIndicator size = 'large'/>
            )
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                {this.renderData()}              
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})