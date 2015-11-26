'use strict';

var React = require('react-native');
var { AppRegistry, Text, Dimensions,View } = React;
var QuiltView = require('react-native-quiltview');
var Section = QuiltView.Section;
var Item = QuiltView.Item;
var Cell = QuiltView.Cell;
var {Actions, Router, Route, Schema, Animations} = require('react-native-router-flux');
var NavigationBar = require('react-native-navbar');

class QuiltViewExample extends React.Component {
    render(){
        return (
            <QuiltView style={{flex:1}}>
            </QuiltView>
        );
    }
}

AppRegistry.registerComponent('QuiltViewExample', () => QuiltViewExample);
