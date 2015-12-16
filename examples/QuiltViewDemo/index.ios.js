'use strict';

var React = require('react-native');
var { AppRegistry, Image, Text, Dimensions,View,StyleSheet,PropTypes } = React;
var QuiltView = require('react-native-quiltview');
var Section = QuiltView.Section;
 var Item = QuiltView.Item;
var Cell = QuiltView.Cell;
var {Actions, Router, Route, Schema, Animations} = require('react-native-router-flux');
var NavigationBar = require('react-native-navbar');

var MMRefresh = require('react-native').NativeModules.MMRefresh;

var Headline = React.createClass({
    propTypes: {
        widthRatio: React.PropTypes.number,
        heightRatio: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            widthRatio: 4,
            heightRatio: 2,
        };
    },

    render(){
        return (
            <Text> Headline </Text>
            );
    }
});

var NormalCell = React.createClass({
    propTypes: {
        widthRatio: React.PropTypes.number,
        heightRatio: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            widthRatio: 4,
            heightRatio: 1,
        };
    },

    render(){
        return (
            <Text> NormalCell </Text>
            );
    }
});

var Album = React.createClass({
    propTypes: {
        widthRatio: React.PropTypes.number,
        heightRatio: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            widthRatio: 4,
            heightRatio: 2,
        };
    },
    
    render(){
        return (
            <Text> Album </Text>
            );
    }
});

var QuiltViewExample = React.createClass({

    getInitialState() {
        return {};
    },

    componentDidMount() {
        var REQUEST_URL = 'http://www.baidu.com';
        fetch(REQUEST_URL)
        .then((response) => {
            this.setState({layout:{
                    "nodeName" : "金融",
                    "components" : [{
                        "componentName" : "普通图文单元",
                        "componentType" : "normalCell",
                        "offset" : 1,
                        "leaf" : { 
                            "leafName" : "leaf_1",
                            "updateTime" : "1448935284",
                            "title" : "新闻1",
                            "desc" : "描述1",
                            "picture" : "http://picm.photophoto.cn/005/008/002/0080020436.jpg",
                        },
                    },
                    {
                        "componentName" : "普通图文单元",
                        "componentType" : "normalCell",
                        "offset" : 2,
                        "leaf" : { 
                            "leafName" : "leaf_2",
                            "updateTime" : "1448935284",
                            "title" : "新闻2",
                            "desc" : "描述2",
                            "picture" : "http://picm.photophoto.cn/005/008/002/0080020436.jpg",
                        },
                    },
                    ]
                }
            });
        });
    },

    _renderRow(rowID : number, rowData : string) {
        return <Cell style={styles.cell} 
        widthRatio={4} 
        heightRatio={1} 
        key={rowID}
        componentType={rowData.componentType}>
            <Image style={styles.icon} source={{uri: rowData.leaf.picture}} />
            <View>
                <Text style={styles.title}>{rowData.leaf.title}</Text>
                <Text style={styles.desc}>{rowData.leaf.desc}</Text>
            </View>
        </Cell>;
    },

    render(){

        if (!this.state.layout) {
            return <View style={styles.container}><Text> loading ... </Text></View>;
        }

        var container = <QuiltView style={styles.container}></QuiltView>;
        var children = [];
        var sections = [];
        var components = this.state.layout.components;

        for (var rowID = 0; rowID < components.length; rowID++) {
            var component = components[rowID];
            var row = this._renderRow(rowID, component);
            children.push(row); 
        };

        var sectionContainer = <Section label="1"/>;
        var section = React.cloneElement(sectionContainer, {ref : 'quiltviewsection'}, children);

        sections.push(section);

        return React.cloneElement(container, {ref : 'quiltviewdemo'}, sections);
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 20,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
  },
  icon: {
    marginLeft: 15,
    marginTop: 10,
    width: 46,
    height: 46,
  },
  title: {
    textAlign: 'left',
    color: '#333333',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
  desc: {
    textAlign: 'left',
    color: '#333333',
    marginLeft: 20,
  },
});

AppRegistry.registerComponent('QuiltViewExample', () => QuiltViewExample);
