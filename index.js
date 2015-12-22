'use strict';

var React = require('react-native');
var {NativeMethodsMixin, ReactNativeViewAttributes, NativeModules, StyleSheet, View, requireNativeComponent} = React;

var QUILTVIEW = 'quiltview';

function extend(el, map) {
    for (var i in map)
        if (typeof(map[i])!='object')
            el[i] = map[i];
    return el;
}
var QuiltView = React.createClass({
    mixins: [NativeMethodsMixin],

    getInitialState: function() {
        return this._stateFromProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        var state = this._stateFromProps(nextProps);
        this.setState(state);
    },

    // Translate TableView prop and children into stuff that RNTableView understands.
    _stateFromProps: function(props) {
        var sections = [];
        var children = [];

        // iterate over sections
        React.Children.forEach(props.children, function (section, index) {
            var items=[];
            var count = 0;
            if (section && section.type == QuiltView.Section) {
                React.Children.forEach(section.props.children, function (child, itemIndex) {
                    var el = {};
                    extend(el, section.props);
                    extend(el, child.props);
                    count++;
                    items.push(el);

                    //if (child.type==QuiltView.Cell){
                        count++;
                        var element = React.cloneElement(child, {key: index+" "+itemIndex});
                        children.push(element);
                    //}

                });
                sections.push({
                    items: items,
                    count: count
                });
            } else if (section){
                children.push(section);
            }
        });
        this.sections = sections;
        return {sections, children};
    },

    render: function() {
        return (
            <View style={[{flex:1},this.props.style]}>
                <RNQuiltView
                    ref={QUILTVIEW}
                    style={this.props.style}
                    sections={this.state.sections}
                    {...this.props} >

                    {this.state.children}
                </RNQuiltView>
            </View>
        );
    },
});

QuiltView.Item = React.createClass({
    propTypes: {
        value: React.PropTypes.any, // string or integer basically
        label: React.PropTypes.string,
    },

    render: function() {
        // These items don't get rendered directly.
        return null;
    },
});

QuiltView.Cell = React.createClass({
    getInitialState(){
        return {width:0, height:0}
    },
    render: function() {
        return <RNCellView {...this.props} />
    },
});
var RNCellView = requireNativeComponent('RNCellView', null);

QuiltView.Section = React.createClass({
    propTypes: {
        label: React.PropTypes.string,
        footerLabel: React.PropTypes.string,
        arrow: React.PropTypes.bool,
        footerHeight: React.PropTypes.number,
        headerHeight: React.PropTypes.number,

    },

    render: function() {
        // These items don't get rendered directly.
        return null;
    },
});

var RNQuiltView = requireNativeComponent('RNQuiltView', null);

module.exports = QuiltView;
