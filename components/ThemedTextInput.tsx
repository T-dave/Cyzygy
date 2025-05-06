import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import React from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';


export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  setText:(text:string)=>void;
};

export default function ThemedTextInput({ style, lightColor, darkColor, setText}: ThemedInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return(
    <TextInput 
      style={[{ backgroundColor }, style, styles.textInput]} 
      onChangeText={(text)=>setText(text)}
      multiline
      numberOfLines={1000}
    />
  )
}

const styles=StyleSheet.create({
    textInput:{
      width:'auto',
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
      textAlignVertical: 'top', // Align text to the top for multiline
      minHeight: 100, // Minimum height for multiline
      borderRadius:4
    }
})