import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

export default class MenuButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} ><Icon name="md-menu" size={30} style={{ color: 'black', paddingLeft: 10 }} /></TouchableOpacity>
        );
    }
}