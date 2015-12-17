'use strict';

var React = require('react-native');
var { Image, Text, View, StyleSheet, requireNativeComponent, TouchableOpacity, ScrollView } = React;
var { Actions } = require('react-native-router-flux');

var RNCellView = requireNativeComponent('RNCellView', null);

var HeadlineCell = React.createClass({
    render() {
        var data = this.props.data;
        var mapping = this.props.mapping;

        // 通过模型映射得到字段值
        var m = mapping[data.componentType];
        var image = eval("data." + m["image"]);
        var title = eval("data." + m["title"]);
        var url = eval("data." + m["url"]);

        // 渲染
        return <TouchableOpacity onPress={()=>Actions.news({"url": url, "title": title})} style={styles.image}>
                    <Image style={styles.image} source={{uri: image}} />
                </TouchableOpacity>;
    }
});

var slateComponents = {
    "headlineCell" : HeadlineCell,
};

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

    _renderHeadlineCell(index : number, data : object) {
        // 动态加载组件
        var componentType = data.componentType;
        var type = slateComponents[componentType];
        var mapping = this.props.mapping;
        return React.createElement(type, {key : "headlinecell" + index, data : data, mapping : mapping});
    },

    render() {
        var data = this.props.data;
        var mapping = this.props.mapping;
        var subComponents = data.subComponents;
        var container = <RNCellView style={styles.cell}  {...this.props} />;
        if (!subComponents) {
            return container;
        }

        var children = [];
        var imageContainer = <ScrollView pagingEnabled={true}
                                    horizontal={true} 
                                    //automaticallyAdjustContentInsets={false}
                                 style={styles.scrollview}/>;
        var imageContainerChildren = []
        for (var index = 0; index < subComponents.length; index++) {
            // 渲染数据
            var subData = subComponents[index];
            var headlineCell = this._renderHeadlineCell(index, subData);
            imageContainerChildren.push(headlineCell); 
        };

        var images = React.cloneElement(imageContainer, {ref : 'scrollview', key : 'scrollview'}, imageContainerChildren);
        children.push(images);

        return React.cloneElement(container, {ref : 'headline'}, children);
    }
});

var styles = StyleSheet.create({
  cell: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  scrollview: {
    flex: 1,
    flexDirection: 'row',
    width:300,
  },
  title: {
    textAlign: 'left',
    color: '#333333',
    marginTop: 20,
    marginLeft: 12,
    width: 290,
  },
  image: {
    flex: 1,
    width:300,
    height:200
  },
});

module.exports = Headline;
