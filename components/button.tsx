import { View, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { primary, disabled } from '@/constants/Colors';

interface ButtonType{
    text:string
    disabled?:boolean;
    onPress:()=>void;
    icon?:any;
    style?:any;
    isLoading:boolean;
}
export default function Button({text, disabled, onPress, icon, style, isLoading=false}:ButtonType) {
  return (
    <TouchableOpacity style={[styles.button, style, {backgroundColor: disabled ? '#F1F5F9' :primary }]} onPress={onPress}>
      {
        isLoading ?
        <ActivityIndicator size={25} color={"#FFF"}/>
        :
        <>
        {
          icon &&
          <Image source={icon} style={{width:13, height:13, marginRight:10}}/>
        }
        <Text style={[styles.text, {color:disabled?'#cbd5e1':'#FFF'}]}>{text}</Text>
        </>

      }
        
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button:{
        paddingHorizontal:24,
        paddingVertical:16,
        borderRadius:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:18,
        fontWeight:700
    }
  });