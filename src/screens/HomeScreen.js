import React from 'react'
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LogoTitle from '../components/LogoTitle';
import MenuButton from '../components/MenuButton';
import DeleteButton from '../components/DeleteButton';
import config from '../../config'

const fullWidth = Dimensions.get('window').width; //full width
const fullHeight = Dimensions.get('window').height; //full width
export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <MenuButton onPress={() => navigation.openDrawer()} />,
            headerTitle: 'Pantry List',
            //<LogoTitle />,
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
    deleteItem = id => {
        fetch(config.API_ENDPOINT + `/groceries/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                this.setState({
                    groceries: this.state.groceries.filter(item => item.id != id)
                })
            })
            .catch(error => {
                console.error(error)
            })
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
                console.log(res)
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
                    <ActivityIndicator />
                </View>
            )
        }
        let listView = <Text>{this.state.errorMessage}</Text>
        if (!this.state.isLoading && !this.state.hasError) {
            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            listView =
                <FlatList style={styles.flatList}
                    data={this.state.groceries}
                    renderItem={({ item }) =>
                        <View style={styles.viewCard}>
                            <Image style={styles.roundImage} source={{ uri: "https://spoonacular.com/cdn/ingredients_100x100/" + item.image, width: 100, height: 100 }} />
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text> {item.name}</Text>
                                <Text> {item.category}</Text>
                                <Text> {item.quantity} {item.unit}, Expires {months[new Date(item.expiry_date).getMonth()]} {new Date(item.expiry_date).getDate()}   </Text>
                            </View>
                            <DeleteButton style={{ paddingRight: 10 }} onPress={() => this.deleteItem(item.id)} />
                        </View>
                    }
                    keyExtractor={(item, index) => item.id.toString()}
                />
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {listView}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        width: fullWidth,
        height: fullHeight
    },
    viewCard: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1
    },
    roundImage: {
        borderRadius: 50,
        width: 50,
        height: 50,
        marginRight: 10
    },
});