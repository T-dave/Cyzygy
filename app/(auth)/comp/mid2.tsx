import { View, KeyboardAvoidingView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {InputText, InputPassword} from '@/components/input';
import { router } from 'expo-router';

interface Mid{
    setEmail:(text:string)=>void;
    setPassword:(text:string)=>void;
}

interface Error{
    value:string;
    type:string;
  }


export default function Mid2({setEmail, setPassword}:Mid) {
  return (
    <KeyboardAvoidingView>
        <InputText placeholder='Email' setText={setEmail}/>
        <View style={{margin:8}}/>
        <InputPassword 
            placeholder='Password'
            setText={setPassword}
        />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    infoIcon:{
        width:24,
        height:24
    },
    errorView:{
        flexDirection:'row',
        alignItems:'center'
    },
    right:{
        width:15.78, 
        height:6.59,
        marginLeft:10
    },
    down:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        marginTop:10
    }
  });