import { View, KeyboardAvoidingView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';


interface Top{
    topText?:string;
    search?:boolean;
    filter?:()=>void;
    share?:boolean;
    back?:boolean;
}


export default function Top({topText, search, filter, share, back}:Top) {
  return (
        <View style={styles.top}>
            {
            back?
            <TouchableOpacity onPress={()=>router.back()}>
                <Image source={require('../assets/images/chevron-left.png')} style={styles.image}/>
            </TouchableOpacity>
            :
            <View style={{padding:14}}/>
            }
            {
                topText ?
                <ThemedText style={styles.text}>{topText}</ThemedText>
                :
                <View/>
            }
            <View style={styles.right}>
            {
                search &&
                <TouchableOpacity>
                    <MaterialIcons size={28} name={'search'} />
                </TouchableOpacity>
            }
            {
                share &&
                <TouchableOpacity>
                    <MaterialIcons size={28} name={'share'} />
                </TouchableOpacity>
            }
            {
                filter &&
                <TouchableOpacity style={{marginLeft:5}} onPress={filter}>
                    <MaterialIcons size={28} name={'filter-list'} />
                </TouchableOpacity>
            }
           </View>
        </View>
  );
}

const styles = StyleSheet.create({
    top:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom:10
    },
    image:{
        width:28,
        height:28
    },
    text:{
        fontSize:23,
        fontWeight:'600'
    },
    right:{
        flexDirection:'row'
    }
  });
