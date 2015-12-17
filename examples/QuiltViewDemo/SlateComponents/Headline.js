'use strict';

var React = require('react-native');
var { Image, Text, View, StyleSheet, requireNativeComponent, TouchableOpacity } = React;
var { Actions } = require('react-native-router-flux');

var RNCellView = requireNativeComponent('RNCellView', null);

var HeadlineCell = React.createClass({
    render() {
        var data = this.props.data;
        var mapping = this.props.mapping;

        // 通过模型映射得到字段值
        var m = mapping[data.componentType];
        var image = eval("data." + m["image"]);

        // 渲染
        return <Image style={styles.icon} source={{uri: image}} />;
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

        // 通过模型映射得到字段值
        var m = mapping[data.componentType];
        var title = eval("data." + m["title"]);
        var url = eval("data." + m["url"]);

        var children = [];

        var titleText = <Text style={styles.title}>{title}</Text>;
        children.push(titleText);

        var imageContainer = <View style={styles.imageContainer}/>;
        var imageContainerChildren = []
        for (var index = 0; index < subComponents.length; index++) {
            // 渲染数据
            var subData = subComponents[index];
            var headlineCell = this._renderHeadlineCell(index, subData);
            imageContainerChildren.push(headlineCell); 
        };

        var images = React.cloneElement(imageContainer, {ref : 'headlineimages'}, imageContainerChildren);
        children.push(images);

        var touch = <TouchableOpacity onPress={()=>Actions.news({"url": url, "title": title})} style={styles.cell} />;
        var touchWithChildren = React.cloneElement(touch, {ref : 'touch'}, children);

        return React.cloneElement(container, {ref : 'headline'}, touchWithChildren);
    }
});

var styles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightgray',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  title: {
    textAlign: 'left',
    color: '#333333',
    marginTop: 20,
    marginLeft: 12,
    width: 290,
  },
  icon: {
    marginLeft: 12,
    marginTop: 15,
    width: 88,
    height: 54,
  },
});

module.exports = Headline;
