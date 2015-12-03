'use strict';

var React = require('react-native');
var { AppRegistry, Text, Dimensions,View } = React;
var QuiltView = require('react-native-quiltview');
var Section = QuiltView.Section;
 var Item = QuiltView.Item;
var Cell = QuiltView.Cell;
var {Actions, Router, Route, Schema, Animations} = require('react-native-router-flux');
var NavigationBar = require('react-native-navbar');

var MMRefresh = require('react-native').NativeModules.MMRefresh;

class QuiltViewExample extends React.Component {
    render(){
        return (
            <QuiltView style={{flex:1}} json="layout">
                    <Cell style={{backgroundColor:'gray'}} widthRatio={4} heightRatio={2} componentType="headline" >
                        <Text style={{color:'white'}}>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}} widthRatio={4} heightRatio={1} componentType="normalCell" >
                        <Text style={{color:'white'}}>4x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}} widthRatio={4} heightRatio={2} componentType="album" >
                        <Text style={{color:'white'}}>4x2</Text>
                    </Cell>
            </QuiltView>
        );
    }
}
/*
class QuiltViewExample extends React.Component {
    render(){
        return (
            <QuiltView style={{flex:1}} json="layout">
                <Section label="1">
                    <Cell style={{backgroundColor:'gray'}} widthRatio={8} heightRatio={4} componentType="type84" >
                        <Text style={{color:'white'}}>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}} widthRatio={4} heightRatio={2} componentType="type42" >
                        <Text style={{color:'white'}}>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}} widthRatio={2} heightRatio={2} componentType="type22" >
                        <Text style={{color:'white'}}>2x2</Text>
                    </Cell>
                    <Item componentType="type22" >Item 3</Item>
                    <Item componentType="type22">Item 4</Item>
                    <Item componentType="type22">Item 5</Item>
                    <Item componentType="type42">Item 6</Item>
                    <Item componentType="type22">Item 7</Item>
                    <Item componentType="type22">Item 8</Item>
                    <Item componentType="type42">Item 9</Item>
                    <Item componentType="type22">Item 10</Item>
                    <Item componentType="type22">Item 11</Item>
                </Section>
            </QuiltView>
        );
    }
}
*/

AppRegistry.registerComponent('QuiltViewExample', () => QuiltViewExample);
