import React from 'react'
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
            authToken: "",
            hasError: false,
            errorMessage: 'There was an error with the app'
        }
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@authToken')
            if (value !== null) {
                this.setState({ authToken: value })
                this.fetchData();
            }
        } catch (e) {
            // error reading value
            alert('There was an error')
        }
    }
    componentDidMount() {
        this.getData();
    }
    fetchData() {
        return fetch(config.API_ENDPOINT + '/groceries', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${this.state.authToken}`
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
        const { navigation } = this.props;
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <Text>Log in</Text>
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                <Text>Welcome back</Text>
                {listView}
            </View>
        );
    }
}