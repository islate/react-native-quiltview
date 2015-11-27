'use strict';

var React = require('react-native');
var { AppRegistry, Text, Dimensions,View } = React;
var QuiltView = require('react-native-quiltview');
// var Section = QuiltView.Section;
// var Item = QuiltView.Item;
var Cell = QuiltView.Cell;
var {Actions, Router, Route, Schema, Animations} = require('react-native-router-flux');
var NavigationBar = require('react-native-navbar');

class QuiltViewExample extends React.Component {
    render(){
        return (
            <QuiltView style={{flex:1}} pixelWidth={120} pixelHeight={120}>
                <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                    <Text>4x2</Text>
                </Cell>
                <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                    <Text>2x2</Text>
                </Cell>
            </QuiltView>
        );
    }
}

AppRegistry.registerComponent('QuiltViewExample', () => QuiltViewExample);
