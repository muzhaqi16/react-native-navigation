import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import SearchBox from '../components/SearchBox'
import ListViewItem from '../components/ListViewItem';

const width = Dimensions.get('window').width; //full width
export default class ShopingListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [
                { id: 1, title: "Dale", completed: true },
                { id: 2, title: "Easter" },
                { id: 3, title: "Gil" },
                { id: 4, title: "Malina" },
                { id: 5, title: "Galvin" },
                { id: 6, title: "Martelle" },
                { id: 7, title: "Lin" },
                { id: 8, title: "Blythe" },
                { id: 9, title: "Bartel" },
                { id: 10, title: "Linnie" },
                { id: 11, title: "Emilee" },
                { id: 12, title: "Livy" },
                { id: 13, title: "Carly" },
                { id: 14, title: "Eulalie" },
                { id: 15, title: "Riley" },
                { id: 16, title: "Erastus" },
                { id: 17, title: "Carmel" },
                { id: 18, title: "Ilysa" },
                { id: 19, title: "Davine" },
                { id: 20, title: "Gisella" },
                { title: "Hello World", id: 21 },
                { title: "To do list", id: 22 }
            ]
        }
    }
    static navigationOptions = {
        title: 'Shoping List',
    };
    handleInput = item => {
        newItem = { title: item, id: 3 }
        this.setState({
            dataList: [...this.state.dataList, newItem]
        })
    }
    render() {
        let listView = (<View><Text>No data</Text></View>);
        if (this.state.dataList.length) {
            listView = (
                <FlatList
                    style={{ width: width, padding: 10, marginBottom: 10 }}
                    data={this.state.dataList}
                    renderItem={({ item }) => <ListViewItem data={item} />
                    }
                    keyExtractor={(item, index) => {
                        return item.id.toString()
                    }
                    }
                />
            );
        }
        return (
            <View style={{ flex: 1, alignItems: "center", flexDirection: "column", justifyContent: "flex-start" }}>
                <SearchBox onSubmit={this.handleInput} />
                {listView}
            </View>
        );
    }
}
