'use strict';

var React = require('react-native');
var { Image, Text, View, StyleSheet, requireNativeComponent, TouchableOpacity } = React;
var { Actions } = require('react-native-router-flux');

var RNCellView = requireNativeComponent('RNCellView', null);

var NormalCell = React.createClass({
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
            heightRatio: 1,
        };
    },

    render() {
        var data = this.props.data;
        var mapping = this.props.mapping;
        if (!data) {
            return <RNCellView style={styles.cell}  {...this.props} />;
        }

        // 通过模型映射得到字段值
        var m = mapping[data.componentType];
        var image = eval("data." + m["image"]);
        var title = eval("data." + m["title"]);
        var subtitle = eval("data." + m["subtitle"]);
        var url = eval("data." + m["url"]);

        // 渲染
        return <RNCellView
                     style={styles.cell} 
                         {...this.props} 
                         onSizeChange={(event)=>{this.setState(event.nativeEvent.size)}} >
                    <TouchableOpacity onPress={()=>Actions.news({"url": url, "title": title})} style={styles.touch}>
                        <Image style={styles.icon} source={{uri: image}} />
                        <View>
                            <Text style={this._titleStyles()}>{title}</Text>
                            <Text style={styles.desc}>{subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                </RNCellView>;
    },

    _titleStyles() {
        return {
            textAlign: 'left',
            color: '#333333',
            marginTop: 10,
            marginLeft: 12,
            width: this.state.width - 62
        };
    }
});

var styles = StyleSheet.create({
  cell: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  touch : {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 12,
    marginTop: 10,
    width: 50,
    height: 50,
  },
  desc: {
    textAlign: 'left',
    color: '#333333',
    marginLeft: 12,
  },
});

module.exports = NormalCell;
