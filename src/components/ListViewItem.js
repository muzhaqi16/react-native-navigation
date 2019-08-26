import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import CheckBox from './CheckBox';

export default class ListViewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    render() {
        let data = this.state.data;
        let color = data.completed ? '#C5C8C9' : '#000';
        let textDecorationLine = data.completed ? 'line-through' : 'none';
        return (
            <TouchableHighlight underlayColor={'#eee'} style={{ flex: 1, paddingTop: 6, paddingBottom: 6, borderBottomWidth: 1, borderColor: '#eee' }} {...this.props.sortHandlers}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox data={data} color={color}></CheckBox>
                    <Text style={{ fontSize: 18, color: color, textDecorationLine: textDecorationLine }}>{data.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
