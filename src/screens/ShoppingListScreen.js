import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import SearchBox from '../components/SearchBox'
import ListViewItem from '../components/ListViewItem';

const width = Dimensions.get('window').width; //full width
export default class ShopingListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }
    static navigationOptions = {
        title: 'Shoping List',
    };
    handleInput = item => {
        newItem = { title: item, id: this.state.dataList.length + 1 }
        this.setState({
            dataList: [...this.state.dataList, newItem]
        })
    }
    handleCheck = id => {
        //To do 
        alert('Checked')
    }
    handleDelete = id => {
        this.setState({
            dataList: this.state.dataList.filter(item => item.id != id)
        })
    }
    render() {
        let listView = (<View><Text>Start adding some items first</Text></View>);
        if (this.state.dataList.length) {
            listView = (
                <FlatList
                    style={{ width: width, padding: 10, marginBottom: 10 }}
                    data={this.state.dataList}
                    renderItem={({ item }) => <ListViewItem data={item} delete={this.handleDelete} checkItem={this.handleCheck} />
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
