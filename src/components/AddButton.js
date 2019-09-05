import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

export default class MenuButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} ><Icon name="ios-add" size={40} style={{ color: 'white', paddingRight: 20 }} /></TouchableOpacity>
        );
    }
}