import React, { Component } from 'react';
import { Text, View, Alert, FlatList, StyleSheet, SafeAreaView,Plataform,StatusBar,
Image,ImageBackground,Dimensions } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
       renderItem = ({ item }) => {
        let meteor = item
        let bg_Image, speed, size;
        if (meteor.threat_score <= 30) {
        let bg_img = requiere("../assets/meteor_bg1.png")
        speed = requiere("..assets/meteor_speed3.gif")
        size = 100
       } else if (meteor.threat_score <= 30) {
        bg_img = requiere("../assets/meteor_bg2.png..")
        speed = requiere("../assets meteor_speed3.gif")
        size = 100
       } else {
        bg_img = requiere("../assets/meteor_bg3.png")
        speed = requiere("../assets/meteor_speed3.gif")
        size = 200
       }

       };
    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Cargando</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            });
              meteors.sort(function (a, b) {
                return b.threat_score - a.threat_score
              })
            return (
                <View style={StyleSheet.container}>
                    <SafeAreaView style={StyleSheet.droidSafeArea} />
                    <FlatList
                    keyExtractor={this.keyExtractor}
                    data={meteors}
                    renderItem={this.renderItem}
                    horizontal={true}
                    />
                    </View >      
            );
        }
    }
}

const styles = StyleShet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.05 === "android" ? statusbar.correntHeight : 0
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
});