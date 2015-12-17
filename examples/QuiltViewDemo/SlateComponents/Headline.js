'use strict';

var React = require('react-native');
var { Image, Text, View, StyleSheet, requireNativeComponent, TouchableOpacity, ScrollView } = React;
var { Actions } = require('react-native-router-flux');
var TimerMixin = require('react-timer-mixin');

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
        return <TouchableOpacity onPress={()=>Actions.news({"url": url, "title": title})} style={styles.cell}>
                    <Image style={styles.image} source={{uri: image}} />
                    <Text style={styles.title} >{title}</Text>
                </TouchableOpacity>;
    }
});

var slateComponents = {
    "headlineCell" : HeadlineCell,
};

var i = 0;

var Headline = React.createClass({
    mixins: [TimerMixin],
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

    componentDidMount() {
        this.setInterval(()=>{
            // 模拟自动轮播
            if (i>2) {
                i=0;
                this.myScroll.scrollWithoutAnimationTo(0, 312 * i);
            }
            else {
                this.myScroll.scrollTo(0, 312 * i);
            }
            i++;
        }, 3000);
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
        var container = <RNCellView style={styles.headline}  {...this.props} />;
        if (!subComponents) {
            return container;
        }

        var children = [];
        var scrollview = <ScrollView ref={(ref) => this.myScroll = ref}
                                    pagingEnabled={true}
                                    horizontal={true} 
                                    bounces={false}
                                    automaticallyAdjustContentInsets={false}
                                 style={styles.scrollview}/>;
        var scrollviewChildren = []
        for (var index = 0; index < subComponents.length; index++) {
            // 渲染数据
            var subData = subComponents[index];
            var headlineCell = this._renderHeadlineCell(index, subData);
            scrollviewChildren.push(headlineCell); 
        };

        var images = React.cloneElement(scrollview, {key : 'scrollview'}, scrollviewChildren);
        children.push(images);

        return React.cloneElement(container, {ref : 'headline'}, children);
    }
});

var styles = StyleSheet.create({
  headline: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  scrollview: {
    flex: 1,
    flexDirection: 'row',
    width:312,
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'rgba(52,52,52,0.6)',
    color: 'white',
    bottom: 0,
    left: 0,
    paddingTop: 4,
    width: 312,
    height: 25
  },
  cell: {
    flex: 1,
    flexDirection: 'column',
    width:312,
    height:150
  },
  image: {
    flex: 1,
    width:312,
    height:150
  },
});

module.exports = Headline;
