'use strict';

var React = require('react-native');
var { AppRegistry, Text, Dimensions,View } = React;
var QuiltView = require('react-native-quiltview');
var Section = QuiltView.Section;
// var Item = QuiltView.Item;
var Cell = QuiltView.Cell;
var {Actions, Router, Route, Schema, Animations} = require('react-native-router-flux');
var NavigationBar = require('react-native-navbar');

class QuiltViewExample extends React.Component {
    render(){
        return (
            <QuiltView style={{flex:1}} >
                <Section label="1">
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>

                </Section>
                 <Section label="1">
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={8} heightRatio={4} >
                        <Text>8x4</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={4} heightRatio={1} >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'red'}} widthRatio={4} heightRatio={2} >
                        <Text>4x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={2} heightRatio={2} >
                        <Text>2x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={2} >
                        <Text>3x2</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'green'}} widthRatio={3} heightRatio={1} >
                        <Text>3x1</Text>
                    </Cell>
                    <Cell style={{backgroundColor:'gray'}}  widthRatio={4} heightRatio={2}  >
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>

                </Section>

            </QuiltView>
        );
    }
}

AppRegistry.registerComponent('QuiltViewExample', () => QuiltViewExample);
