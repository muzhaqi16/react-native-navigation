import React, { Component } from 'react';
import { View, TextInput, Dimensions, Button } from 'react-native';

const width = Dimensions.get('window').width; //full width

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }
    handleAddItem = () => {
        this.props.onSubmit(this.state.text)
        this.setState({
            text: ''
        })
    }
    render() {
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
            }}>
                <TextInput style={{
                    flex: 1,
                    height: 36,
                    textAlign: 'left',
                    padding: 5,
                    marginBottom: 0,
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: '#bada55',
                    borderRadius: 0,
                    marginRight: 4
                }}
                    placeholder='Add a shopping item'
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    onSubmitEditing={this.handleAddItem}
                    blurOnSubmit={false}>
                </TextInput>
                <Button
                    title="Add"
                    onPress={this.handleAddItem}
                    style={{
                        color: 'white'
                    }} />
            </View>
        );
    }
}

module.exports = SearchBox;
