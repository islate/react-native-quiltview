'use strict';

var React = require('react-native');
var { NativeMethodsMixin, requireNativeComponent } = React;
var QUILTVIEW = 'quiltview';
var RNQuiltView = requireNativeComponent('RNQuiltView', null);

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

                    {
                        count++;
                        //var element = React.cloneElement(child, {key: index+" "+itemIndex});
                        //children.push(element);
                        children.push(child);
                    }

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
        var children = this.state.children;
        var refreshControl = this.props.refreshControl;
        return <RNQuiltView
                    ref={QUILTVIEW}
                    style={this.props.style}
                    sections={this.state.sections}
                    {...this.props} >
                    {refreshControl}
                    {children}
                </RNQuiltView>;
    },
});

QuiltView.Section = React.createClass({
    render: function() {
        // These items don't get rendered directly.
        return null;
    },
});

module.exports = QuiltView;
