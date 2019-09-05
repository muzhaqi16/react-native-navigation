import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

export default class AddGroceries extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add an item',
        }
    };
    render() {
        return (<View>
            <Text>Ckemi Lunisa </Text>
        </View>)
    }
}