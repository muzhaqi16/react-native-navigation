import React from 'react';
import { TextInput } from 'react-native';

export default class PasswordInput extends React.Component {
    render() {
        return (
            <TextInput
                textContentType="password"
                placeholder="Enter password"
                secureTextEntry={true}
                onChangeText={this.props.handlePasswordChange}
                autoCorrect={false}
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