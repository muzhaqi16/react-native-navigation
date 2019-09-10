import React from 'react'
import { StyleSheet, ScrollView, Button } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
const DrawerContainer = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
        >
            <DrawerNavigatorItems {...props} />
            <Button title="Log Out" onPress={() => this.logOut(props)} />
        </SafeAreaView>
    </ScrollView>
);
logOut = async (props) => {
    try {
        await AsyncStorage.removeItem('@authToken')
    } catch (e) {
        // remove error
    }
    props.navigation.navigate('AuthLoading');
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default DrawerContainer;