import { ImageBackground, Keyboard, ScrollView, StyleSheet, TouchableOpacity, Image, View, Alert, Pressable, Text, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator, Appearance } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { primary } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import Button from '@/components/button';
import { InputText } from '@/components/input';
import { ThemedView } from '@/components/ThemedView';
import Top from '@/components/top';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MaterialIcons } from '@expo/vector-icons';
import Storage from '@/hooks/handleStorage';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';




const data = [
  { label: 'Enrolled', value: '1' },
  { label: 'Graduated', value: '2' },
  { label: 'Alumni', value: '3' },

];

export default function AddStudentScreen() {
    const { 
        newName, 
        setNewName, 
        newEmail, 
        setNewEmail, 
        newStatus, 
        setNewStatus,
        addStudent, 
        imageUri,
        uploadProfilePicture,
        imageLoad,
        buttonLoad
    } = Storage();

    const textColor = useThemeColor({}, 'text');
    
    const [status, setStatus] = useState('');
    const disable = ()=>{
        if (newName.length>2 && /\S+@\S+\.\S+/.test(newEmail) && newStatus && imageUri){
            return false;
        }else return true;
    }
    const [isFocus, setIsFocus] = useState(false);
    const renderLabel = () => {
        if (newStatus || isFocus) {
          return (
            <ThemedText type='small'  style={[styles.label, isFocus && { color: 'blue' }]}> Enrollment Status</ThemedText>
          );
        }
        return null;
      };
    const handleAdd = async ()=>{
      addStudent()
      router.replace('/');
      setTimeout(() => router.replace("/(tabs)"), 100);
      
    }
    const currentScheme = Appearance.getColorScheme();
    const color1=()=>{
      if(currentScheme ==='light'){
        return "#FFF"
      }else{
        return "#444"
      }
    }
    const color2=()=>{
      if(currentScheme ==='light'){
        return "#000"
      }else{
        return "#FFF"
      }
    }
    const color3=()=>{
      if(currentScheme ==='light'){
        return 'blue'
      }else{
        return "#5555FF"
      }
    }
  
  return (
    <ThemedView style={{flex:1}}>
        <Top topText="Add Student"/>
        
        <View style={styles.content}>
        
            <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}> 
                <TouchableOpacity style={[styles.profilePic, {backgroundColor:'grey'}]} onPress={uploadProfilePicture}>
                    {
                        imageLoad ?
                        <ActivityIndicator size="large" color={"#FFF"}/>
                        :
                        imageUri ?
                        <Image source={{ uri: imageUri }} style={{width:"100%", height:"100%", borderRadius:100,}}/>
                        :
                        <MaterialIcons color={"#FFF"} size={50} name={'add'}/>
                    }
                </TouchableOpacity>
                <KeyboardAvoidingView>
                    <InputText placeholder='Full Name' setText={setNewName} value={newName}/>
                    <View style={{margin:10}}/>
                    <InputText placeholder='Email' setText={setNewEmail} value={newEmail}/>
                    <View style={{margin:10}}/>
                    <View style={{backgroundColor:color1()}}>
                        {renderLabel()}
                        <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={[styles.placeholderStyle, {color:color2()}]}
                        selectedTextStyle={[styles.selectedTextStyle, {color:color2()}]}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Enrollment Status' : '...'}
                        value={"Value"}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setNewStatus(item.label);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                            style={styles.icon}
                            color={isFocus ? color3() : color2()}
                            name="Safety"
                            size={20}
                            />
                        )}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <View>
                <Button text={'ADD STUDENT'} disabled = {disable()} onPress={handleAdd} isLoading={buttonLoad}/>
            </View>
        </View>
        
    </ThemedView>
  );
}


const styles = StyleSheet.create({
    content:{
       width:'100%',
       padding:20,
       flex:1,
   },
   profilePic:{
    width:180,
    height:180,
    borderRadius:100,
    alignSelf:'center',
    marginBottom:20,
    alignItems:'center',
    justifyContent:'center'
   },
    buttons:{
       flexGrow:1
    },
    button:{
       paddingHorizontal:30,
       paddingVertical:10,
       borderColor:"#9b9b9b",
       borderRadius:8
    },
    inner:{
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between'
     },
     top:{
       marginTop:10, 
       marginLeft:5, 
       color:'#9B9B9B'
     },
     inputView:{
       backgroundColor:"#FFF",
       borderRadius:4,
       paddingHorizontal:16,
       paddingBottom:10,
     },
      dropdown: {
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
   });