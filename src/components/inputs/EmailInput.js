import React from 'react';
import { TextInput } from 'react-native';

export default class EmailInput extends React.Component {
    render() {
        return (
            <TextInput
                textContentType="emailAddress"
                placeholder="Enter email address"
                autoCapitalize="none"
                onChangeText={this.props.handleEmailChange}
                autoCorrect={false}
                autoFocus={true}
                autoCapitalize="none"
                style={{
                    flex: 1,
                    height: 36,
                    textAlign: 'left',
                    padding: 5,
                    marginBottom: 10,
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: '#bada55',
                    borderRadius: 0,
                    marginRight: 4
                }}
            />)
    }
}