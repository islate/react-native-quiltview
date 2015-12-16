'use strict';

var React = require('react-native');
var { AppRegistry, Image, Text, Dimensions,View,StyleSheet,PropTypes,requireNativeComponent } = React;

var RNCellView = requireNativeComponent('RNCellView', null);

var AlbumCell = React.createClass({
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
    "albumCell" : AlbumCell,
};


var Album = React.createClass({
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

    _renderAlbumCell(index : number, data : object) {
        // 动态加载组件
        var componentType = data.componentType;
        var type = slateComponents[componentType];
        var mapping = this.props.mapping;
        return React.createElement(type, {key : "albumcell" + index, data : data, mapping : mapping});
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

        var children = [];

        var titleText = <Text style={styles.title}>图集:{title}</Text>;
        children.push(titleText);

        var imageContainer = <View style={styles.imageContainer}/>;
        var imageContainerChildren = []
        for (var index = 0; index < subComponents.length; index++) {
            // 渲染数据
            var subData = subComponents[index];
            var albumCell = this._renderAlbumCell(index, subData);
            imageContainerChildren.push(albumCell); 
        };

        var images = React.cloneElement(imageContainer, {ref : 'albumimages'}, imageContainerChildren);
        children.push(images);

        return React.cloneElement(container, {ref : 'album'}, children);
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
    marginTop: 10,
    marginLeft: 20,
    width: 150,
  },
  icon: {
    marginLeft: 20,
    marginTop: 10,
    width: 80,
    height: 80,
  },
});

module.exports = Album;
