import React from 'react'
import { Button, View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import LogoTitle from '../components/LogoTitle';
import config from '../../config'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <LogoTitle />,
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
            />
        ),
        title: 'Home',
    };

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    componentDidMount() {
        return fetch(config.API_ENDPOINT + '/api/groceries', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NjY2ODU3MzksImV4cCI6MTU2NjY5NjUzOSwic3ViIjoidGVzdCJ9.dFQtIKMtZRh8rsi3lS1_eJkOA60pUrQg-S1n_sIf_yo`
            }
        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    isLoading: false,
                    groceries: res,
                });

            })
            .catch((error) => {
                console.error(error);
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
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {<FlatList
                    data={this.state.groceries}
                    renderItem={({ item }) => <Text>
                        <Image source={{ uri: "https://spoonacular.com/cdn/ingredients_100x100/" + item.image, width: 100, height: 100 }} />
                        {item.name}, {item.category}</Text>
                    }
                    keyExtractor={item => item.id.toString()}
                />}
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