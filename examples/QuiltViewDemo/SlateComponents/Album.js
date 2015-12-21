'use strict';

var React = require('react-native');
var { Image, Text, View, StyleSheet, requireNativeComponent, TouchableOpacity } = React;
var { Actions } = require('react-native-router-flux');

var RNCellView = requireNativeComponent('RNCellView', null);

var AlbumCell = React.createClass({
    render() {
        var data = this.props.data;
        var mapping = this.props.mapping;

        // 通过模型映射得到字段值
        var m = mapping[data.componentType];
        var image = eval("data." + m["image"]);

        // 渲染
        return <Image style={this._imageStyles()} source={{uri: image}} />;
    },

    _imageStyles() {
        var imageWidth = this.props.width * 0.8 / 3.0;
        var imageHeight = imageWidth * 54.0 / 88.0;
        var marginLeft = (this.props.width * 0.2) / 4.0;
        return {
            marginLeft: marginLeft,
            marginTop: 15,
            width: imageWidth,
            height: imageHeight,
        };
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

    getInitialState() {
        return {width:0, height:0};
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
        return React.createElement(type, {key : "albumcell" + index, data : data, mapping : mapping, width:this.state.width});
    },

    render() {
        var data = this.props.data;
        var mapping = this.props.mapping;
        var subComponents = data.subComponents;
        var container = <RNCellView
                    onSizeChange={(event)=>{this.setState(event.nativeEvent.size)}}
                     style={styles.cell} 
                     {...this.props} />;
        if (!subComponents) {
            return container;
        }

        // 通过模型映射得到字段值
        var m = mapping[data.componentType];
        var title = eval("data." + m["title"]);
        var url = eval("data." + m["url"]);

        var children = [];

        var titleText = <Text style={this._titleStyles()} key="title">{title}</Text>;
        children.push(titleText);

        var imageContainer = <View style={styles.imageContainer}/>;
        var imageContainerChildren = []
        for (var index = 0; index < subComponents.length; index++) {
            // 渲染数据
            var subData = subComponents[index];
            var albumCell = this._renderAlbumCell(index, subData);
            imageContainerChildren.push(albumCell); 
        };

        var images = React.cloneElement(imageContainer, {ref : 'albumimages', key : 'albumimages'}, imageContainerChildren);
        children.push(images);

        var touch = <TouchableOpacity onPress={()=>Actions.news({"url": url, "title": title})} style={styles.cell} />;
        var touchWithChildren = React.cloneElement(touch, {ref : 'touch', key : 'touch'}, children);

        return React.cloneElement(container, {ref : 'album'}, touchWithChildren);
    },

    _titleStyles() {
        return {
            textAlign: 'left',
            color: '#333333',
            marginTop: 20,
            marginLeft: 12,
            width: this.state.width - 24,
        };
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
  icon: {
    marginLeft: 12,
    marginTop: 15,
    width: 88,
    height: 54,
  },
});

module.exports = Album;
