import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";

export default class DeleteButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} ><Icon name="ios-trash" size={30} style={{ color: 'red', paddingRight: 10 }} /></TouchableOpacity>
        );
    }
}