'use strict';

var React = require('react-native');
var { Image, Text, View, StyleSheet, requireNativeComponent, TouchableOpacity, ScrollView } = React;
var SlateURI = require('../SlateURI');
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
        
        var uri = "demo://news/" + title + "/" + url;

        // 渲染
        return <TouchableOpacity onPress={()=>SlateURI.openURI(uri)} style={this._cellStyles()}>
                    <Image style={this._imageStyles()} source={{uri: image}} />
                    <Text style={this._textStyles()} >{title}</Text>
                </TouchableOpacity>;
    },

    _cellStyles() {
        return {
            width:this.props.width,
            height:this.props.height
        };
    },

    _imageStyles() {
        return {
            width:this.props.width,
            height:this.props.height
        };
    },

    _textStyles() {
        return {
            position: 'absolute',
            textAlign: 'center',
            backgroundColor: 'rgba(52,52,52,0.6)',
            color: 'white',
            bottom: 0,
            left: 0,
            paddingTop: 4,
            width: this.props.width,
            height: 25
        };
    },
});

var slateComponents = {
    "headlineCell" : HeadlineCell,
};

var Headline = React.createClass({
    mixins: [TimerMixin],
    propTypes: {
        widthRatio: React.PropTypes.number,
        heightRatio: React.PropTypes.number
    },

    getInitialState() {
        return {width:0, height:0, scrollIndex:0};
    },

    getDefaultProps() {
        return {
            widthRatio: 4,
            heightRatio: 2
        };
    },

    componentDidMount() {
        this.setInterval(()=>{
            // 模拟自动轮播
            var width = this.state.width;
            var layout = this.props.data;
            if (!layout) {
                return false;
            }
            var scrollIndex = this.state.scrollIndex;
            if (scrollIndex > layout.subComponents.length - 1) {
                scrollIndex = 0;
                this.myScroll.scrollTo({y:0, x:width * scrollIndex, animated:false});
            }
            else {
                this.myScroll.scrollTo({y:0, x:width * scrollIndex, animated:true});
            }
            scrollIndex++;
            this.setState({scrollIndex});
        }, 3000);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.width !== nextState.width || this.state.height !== nextState.height;
    },

    _renderHeadlineCell(index : number, data : object) {
        // 动态加载组件
        var componentType = data.componentType;
        var type = slateComponents[componentType];
        var mapping = this.props.mapping;
        return React.createElement(type, {key : "headlinecell" + index, 
            data : data, 
            mapping : mapping, 
            width:this.state.width, 
            height:this.state.height});
    },

    render() {
        var data = this.props.data;
        var mapping = this.props.mapping;
        var subComponents = data.subComponents;
        var container = <RNCellView 
                            style={this._headlineStyles()}
                            onSizeChange={(event)=>{this.setState(event.nativeEvent.size)}} 
                            {...this.props} />;
        
        if (!subComponents) {
            return container;
        }

        var scrollview = <ScrollView ref={(ref) => this.myScroll = ref}
                                    pagingEnabled={true}
                                    horizontal={true} 
                                    bounces={false}
                                    automaticallyAdjustContentInsets={false}
                                    style={styles.scrollview}/>;

        var scrollviewChildren = [];
        for (var index = 0; index < subComponents.length; index++) {
            // 渲染数据
            var subData = subComponents[index];
            var headlineCell = this._renderHeadlineCell(index, subData);
            scrollviewChildren.push(headlineCell); 
        };

        var scrollviewWithChildren = React.cloneElement(scrollview, {key : 'scrollview'}, scrollviewChildren);

        return React.cloneElement(container, {ref : 'headline'}, scrollviewWithChildren);
    },

    _headlineStyles() {
        return {
            position: 'absolute',
            backgroundColor: 'lightgray',
            top: 0,
            left: 0,
            width: this.state.width,
            height: this.state.height
        };
    }
});

var styles = StyleSheet.create({
    scrollview : {
        flex: 1,
        flexDirection: 'row',
    }
});

module.exports = Headline;
