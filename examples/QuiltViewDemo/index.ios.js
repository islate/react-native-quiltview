'use strict';

var React = require('react-native');
var { AppRegistry, Image, Text, Dimensions,View,StyleSheet,PropTypes,requireNativeComponent } = React;
var QuiltView = require('react-native-quiltview');
var Section = QuiltView.Section;
 var Item = QuiltView.Item;
var Cell = QuiltView.Cell;

// 组件库
var Headline = require('./SlateComponents/Headline');
var NormalCell = require('./SlateComponents/NormalCell');
var Album = require('./SlateComponents/Album');
var slateComponents = {
    "headline" : Headline,
    "normalCell" : NormalCell,
    "album" : Album,
};

// 主界面
var QuiltViewExample = React.createClass({

    getInitialState() {
        return {};
    },

    componentDidMount() {
        //var REQUEST_URL = 'http://www.baidu.com';
        //fetch(REQUEST_URL)
        //.then((response) => {
        //});

        this.setState({"layout" : {
            "nodeName" : "金融",
            "components" : [{
                "componentName" : "轮播图容器",
                "componentType" : "headline",
                "offset" : 1,
                "leaf" : { 
                        "leafName" : "leaf_1_1",
                        "updateTime" : "1448935284",
                        "title" : "头条新闻1",
                        "desc" : "描述1",
                        "picture" : "http://picm.photophoto.cn/005/008/002/0080020436.jpg",
                    }, 
                    "subComponents" : [{
                        "componentName" : "轮播图",
                        "componentType" : "headlineCell",
                        "leaf" : { 
                            "leafName" : "leaf_1_1",
                            "updateTime" : "1448935284",
                            "title" : "头条新闻1",
                            "desc" : "描述1",
                            "picture" : "http://picm.photophoto.cn/005/008/002/0080020436.jpg",
                        }, 
                    },
                    {
                        "componentName" : "轮播图",
                        "componentType" : "headlineCell",
                        "leaf" : { 
                            "leafName" : "leaf_1_2",
                            "updateTime" : "1448935284",
                            "title" : "头条新闻2",
                            "desc" : "描述2",
                            "picture" : "http://picm.photophoto.cn/005/008/002/0080020436.jpg",
                        },
                    }],
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
                {
                    "componentName" : "普通图文单元",
                    "componentType" : "normalCell",
                    "offset" : 3,
                    "leaf" : { 
                        "leafName" : "leaf_3",
                        "updateTime" : "1448935284",
                        "title" : "新闻3",
                        "desc" : "描述3",
                        "picture" : "http://picm.photophoto.cn/005/008/002/0080020436.jpg",
                    },
                },
                {
                    "componentName" : "图集",
                    "componentType" : "album",
                    "offset" : 4,
                    "leaf" : { 
                        "leafName" : "leaf_4",
                        "updateTime" : "1448935284",
                        "title" : "三个图标",
                        "desc" : "描述4",
                    },
                    "subComponents" : [{
                        "componentName" : "图集单元",
                        "componentType" : "albumCell",
                        "leaf" : { 
                            "leafName" : "leaf_4_1",
                            "updateTime" : "1448935284",
                            "title" : "图1",
                            "desc" : "描述1",
                            "picture" : "http://picm.photophoto.cn/005/008/002/0080020436.jpg",
                        },
                    },
                    {
                        "componentName" : "图集单元",
                        "componentType" : "albumCell",
                        "leaf" : { 
                            "leafName" : "leaf_4_2",
                            "updateTime" : "1448935284",
                            "title" : "图2",
                            "desc" : "描述2",
                            "picture" : "http://picm.photophoto.cn/005/008/002/0080020436.jpg",
                        },
                    },
                    {
                        "componentName" : "图集单元",
                        "componentType" : "albumCell",
                        "leaf" : { 
                            "leafName" : "leaf_4_3",
                            "updateTime" : "1448935284",
                            "title" : "图3",
                            "desc" : "描述3",
                            "picture" : "http://picm.photophoto.cn/005/008/002/0080020436.jpg",
                        }, 
                    }],
                }],
            }, 
            "mapping" : {
                "headline" : {
                    "title" : "leaf.title",
                    "subtitle" : "leaf.desc",
                    "image" : "leaf.picture",
                },
                "album" : {
                    "title" : "leaf.title",
                },
                "albumCell" : {
                    "image" : "leaf.picture",
                },
                "headlineCell" : {
                    "title" : "leaf.title",
                    "subtitle" : "leaf.desc",
                    "image" : "leaf.picture",
                },
                "normalCell" : {
                    "title" : "leaf.title",
                    "subtitle" : "leaf.desc",
                    "image" : "leaf.picture",
                },
            }
        });
    },

    _renderRow(rowID : number, rowData : object) {
        // 动态加载组件
        var componentType = rowData.componentType;
        var type = slateComponents[componentType];
        return React.createElement(type, {key : "cell" + rowID, data : rowData, mapping : this.state.mapping});
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
            // 渲染数据
            var rowData = components[rowID];
            var row = this._renderRow(rowID, rowData);
            children.push(row); 
        };

        var sectionContainer = <Section label="1" key="section0"/>;
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
