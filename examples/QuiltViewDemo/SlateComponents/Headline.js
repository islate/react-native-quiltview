'use strict';

var React = require('react-native');
var { AppRegistry, Image, Text, Dimensions,View,StyleSheet,PropTypes,requireNativeComponent } = React;

var RNCellView = requireNativeComponent('RNCellView', null);

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

    render() {
        var data = this.props.data;
        var mapping = this.props.mapping;
        if (!data) {
            return <RNCellView style={styles.cell}  {...this.props} />;
        }
        
        // 通过模型映射得到字段值
        var image = eval("data." + mapping["image"]);
        var title = eval("data." + mapping["title"]);
        var subtitle = eval("data." + mapping["subtitle"]);

        // 渲染
        return <RNCellView style={styles.cell}  {...this.props}>
                    <Image style={styles.icon} source={{uri: image}} />
                    <View>
                        <Text style={styles.title}>NormalCell{title}</Text>
                        <Text style={styles.desc}>{subtitle}</Text>
                    </View>
                </RNCellView>;
    }
});

var styles = StyleSheet.create({
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

module.exports = Headline;
