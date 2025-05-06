import React, { useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';
import StudentScreen from './students';
import AddStudentScreen from './addStudent';
import SettingScreen from './settings';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Storage from '@/hooks/handleStorage';
import { primary } from '@/constants/Colors';


const renderScene = SceneMap({
  first: StudentScreen,
  second: AddStudentScreen,
  third: SettingScreen,
});


export default function NavigationScreen() {
  const {index, setIndex} = Storage();
    const [routes] = useState([
        { key: 'first', title: 'Students', icon: 'school' },
        { key: 'second', title: 'Add Students', icon: 'add' },
        { key: 'third', title: 'Settings', icon: 'settings' },
    ]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={() => null}
                initialLayout={{ width: Dimensions.get('window').width }} // Full width for better responsiveness
                style={{ flex: 1 }}
                animationEnabled={true}
                swipeEnabled={true} 
            />
            <TabBar 
                routes={routes} 
                index={index} 
                setIndex={setIndex} 
            />
        </GestureHandlerRootView>
    );
};

// Custom TabBar component
const TabBar = ({ routes, index, setIndex }:any) => {
    return (
        <View style={styles.tabBar}>
            {routes.map((route: { key: React.Key | null | undefined; icon: any; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, i: any) => (
                <TouchableOpacity
                    key={route.key}
                    style={styles.tabButton}
                    onPress={() => {
                      setIndex(i)
                      console.log(index)
                    }}
                >
                    <MaterialIcons name={route.icon} size={28} color={index === i ? primary : '#000'} />
                    <Text style={styles.tabText}>{route.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8', // Background color for the content
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingBottom:25
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 12,
        color: '#000',
    },
});