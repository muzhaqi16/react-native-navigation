import React from 'react'
import { Button, View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import LogoTitle from '../components/LogoTitle';
import MenuButton from '../components/MenuButton';

import config from '../../config'

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
            headerTitle: <LogoTitle />,
            // headerRight: (
            //     <Button
            //         onPress={() => alert('This is a button!')}
            //         title="Info"
            //     />
            // ),
            title: 'Home',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hasError: false,
            errorMessage: 'There was an error with the app'
        }
    }

    componentDidMount() {
        return fetch(config.API_ENDPOINT + '/api/groceries', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NjY3NzEwMzIsImV4cCI6MTU2Njc4MTgzMiwic3ViIjoidGVzdCJ9.4K1UUCgKRzVgCM6NVjXyGoR2atRzXdOQsfavxVghxCc`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then((res) => {
                this.setState({
                    isLoading: false,
                    groceries: res,
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    hasError: true,
                    errorMessage: error.error
                })
            });
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        let listView = <Text>{this.state.errorMessage}</Text>
        if (!this.state.isLoading && !this.state.hasError) {
            listView =
                <FlatList
                    data={this.state.groceries}
                    renderItem={({ item }) => <Text>
                        <Image source={{ uri: "https://spoonacular.com/cdn/ingredients_100x100/" + item.image, width: 100, height: 100 }} />
                        {item.name}, {item.category}</Text>
                    }
                    keyExtractor={(item, index) => item.id.toString()}
                />
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {listView}
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        this.props.navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            </View>
        );
    }
}