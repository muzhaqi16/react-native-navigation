import React, { Component } from 'react';
import { TextInput, Dimensions } from 'react-native';

const width = Dimensions.get('window').width; //full width

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newValue: ''
        };
    }

    render() {
        return (
            <TextInput style={{
                width: width / 1.5,
                textAlign: 'center',
                height: 36,
                padding: 4,
                marginBottom: 0,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 8,
                backgroundColor: 'blue'
            }}
                placeholder='Add a todo or Search'
                blurOnSubmit={false}>
            </TextInput>
        );
    }
}

module.exports = SearchBox;
