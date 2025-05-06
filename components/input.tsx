import React , { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Image, Appearance } from 'react-native';
import Data from '@/app/(auth)/comp/data';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface Input{
  placeholder:string;
  setText: (text: string) => void;
  image?:any;
  size?:{width:number, height:number};
  value:string;
}

const currentScheme = Appearance.getColorScheme();
const color=()=>{
  if(currentScheme ==='light'){
    return "#000"
  }else{
    return "#FFF"
  }
}
const color2=()=>{
  if(currentScheme ==='light'){
    return "#FFF"
  }else{
    return "#444"
  }
}

export const InputText = ({placeholder, setText, image, size, value}:Input) => {
  
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [check, setCheck] = useState(false);
  
  const validateInput = () => {
    setIsFocused(false)
    if (!value?.trim()) {
      setError(`${placeholder} is required`);
    } else if (placeholder === "Email" && !/\S+@\S+\.\S+/.test(value)) {
      setError("Enter a valid email address");
    }else {
      setError(""); // Clear error if valid
    }
  };
  const handleText = (text:string)=>{
    setText(text)
    setError("");
    if (placeholder === "Email" && !/\S+@\S+\.\S+/.test(value)){
      setCheck(false)
    }else if (value?.length>=3){
      setCheck(true);
    }else{setCheck(false)}
  }
  const clear = ()=>{
    setText("")
    setError("");
  }

  return (
    <View>
      <View style={[styles.inputView, {borderWidth:(error && error.length>0) ? 1 : 0, borderColor:"#F01F0E", backgroundColor:color2()}]} >
        {
          (value?.length > 0 || isFocused) &&
          <ThemedText type='small' style={[styles.top, {color:currentScheme ==='light' ? '#9B9B9B' : "#FFF"}]}>{placeholder}</ThemedText>
        }
        <View style={[styles.inner,{paddingVertical:(value?.length > 0 || isFocused) ? 0 : 8}]}>
          <TextInput 
          style={[styles.input, {color:color()}]} 
          placeholder={placeholder} 
          placeholderTextColor={color()}
          onChangeText={(text)=>{handleText(text)}}
          onBlur={validateInput}
          onFocus={() => setIsFocused(true)} 
          value={value}
            />
          {
            check && !error ? 
            <Image source={require('../assets/images/check.png')} style={styles.check}/>
            : error ?
            <TouchableOpacity onPress={clear}>
              <Image source={require('../assets/images/x.png')} style={{width:14, height:14}}/>
            </TouchableOpacity>
            :
            <></>
          }
          {
            image &&
            <Image source={image} style={{width:size?.width, height:size?.height}}/>
          }
        </View>
      </View>
      {
        error && error.length>0  &&
        <View style={{alignItems:'center'}}>
          <ThemedText type='small' style={styles.error}>{error}</ThemedText>
        </View>
      }
      </View>
  );
}



export const InputPassword = ({placeholder, setText, value}:Input) => {
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const validateInput = () => {
    setIsFocused(false)
    if (!value?.trim()) {
      setError(`${placeholder} is required`);
    }else if (placeholder === "Password" && value.length < 6) {
      setError("Password must be at least 6 characters");
    } else {
      setError(""); // Clear error if valid
    }
  };

  const handleText = (text:string)=>{
    setText(text)
    setError("");
  }
  return (
    <View>
      <View style={[styles.inputView, {borderWidth:(error && error.length>0) ? 1 : 0, borderColor:"#F01F0E", backgroundColor:color2()}]} >
      {
          (value?.length > 0 || isFocused) &&
          <ThemedText type='small' style={[styles.top, {color:currentScheme ==='light' ? '#9B9B9B' : "#FFF"}]}>{placeholder}</ThemedText>
      }
        <View style={{flexDirection:'row', alignItems:'center', paddingVertical:(value?.length > 0 || isFocused) ? 0 : 8}}>
          <TextInput style={[styles.input, {color:color()}]} placeholder={placeholder} secureTextEntry = {showPassword} onChangeText={(text)=>{handleText(text)}} onBlur={validateInput} onFocus={() => setIsFocused(true)} placeholderTextColor={color()}/>
          
          <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
            <Image source={require('../assets/images/visible.png')} style={styles.icon}/>
          </TouchableOpacity>
          
        </View>
      </View>
      {
        error && error.length>0  &&
        <View style={{alignItems:'center'}}>
          <ThemedText type='small' style={styles.error}>{error}</ThemedText>
        </View>
    }
  </View>
  );
}



const styles = StyleSheet.create({
  input:{
    fontSize:16,
    flex:1,
  },
  inputView:{
    borderRadius:4,
    paddingHorizontal:16,
  },
  icon:{
    width:24,
    height:24,
},
infoIcon:{
  width:24,
  height:24,
  marginRight:4
},
inner:{
  flexDirection:'row',
  alignItems:'center'
},
errorView:{
  flexDirection:'row',
  alignItems:'center'
},
error:{
  color:"#F01F0E",
},
top:{
  marginTop:10, 
  marginLeft:5, 
  color:'#9B9B9B'
},
check:{
  width:19,
  height:16
}
});
