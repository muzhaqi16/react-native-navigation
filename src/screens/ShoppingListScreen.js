import React from 'react';
import { View, Text, FlatList } from 'react-native';
import SearchBox from '../components/SearchBox'
import ListViewItem from '../components/ListViewItem';

export default class ShopingListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [
                { title: "Hello World", id: 1 },
                { title: "To do list", id: 2 }
            ]
        }
    }
    static navigationOptions = {
        title: 'Shoping List',
    };
    render() {
        let listView = (<View><Text>No data</Text></View>);
        if (this.state.dataList.length) {
            listView = (
                <FlatList
                    style={{ flex: 1 }}
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
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <SearchBox />
                {listView}
            </View>
        );
    }
}
