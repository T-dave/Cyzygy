import { ImageBackground, Keyboard, ScrollView, StyleSheet, TouchableOpacity, Image, View, Alert, Pressable, Text, Dimensions, Modal,  } from 'react-native';
import { useEffect, useState } from 'react';
import CustomModal from '@/components/CustomModal';
import { ThemedText } from '@/components/ThemedText';
import { primary } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import Button from '@/components/button';
import { InputPassword, InputText } from './input';
import { Base64 } from 'js-base64';
import Storage from '@/hooks/handleStorage';

interface ModalInt{
    modalVisible:boolean;
    setModalVisible:(value: boolean) => void;
}

export default function SettingsModal({modalVisible, setModalVisible}:ModalInt) {
    const { user, changePassword, fetchStudents, buttonLoad } = Storage();
    useEffect(() => {
        fetchStudents();
      },[]);
      
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const disable = ()=>{
        if (newPassword === repeat && password.length >3 && newPassword.length >3){
            return false
        }else return true;
    }
    const handleChange = ()=>{
        const encryptedNew = Base64.encode(newPassword);
        const encryptedOld = Base64.encode(password);
        if (newPassword === repeat){
            if(encryptedOld === user.password){
                changePassword(encryptedNew);
                setModalVisible(false);
                Alert.alert("Password Changed Sucessfully")
            }else{
                Alert.alert("Incorrect Password")
            }
        }else{
            Alert.alert("Please let your passwords match")
        }
    }

  return (
    <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)} heightPercentage={0.60} backdropOpacity={0.6}>  
        <ThemedText style={{fontSize:24, fontWeight:'700'}}>Password Change</ThemedText>
        <View style={styles.content}>
            <View style={styles.buttons}> 
            <InputPassword 
                      placeholder='Old Password'
                      setText={setPassword} value={password}              />
            <TouchableOpacity style={styles.forgot}>
                <ThemedText lightColor='#9B9B9B'>Forgot Password</ThemedText>
            </TouchableOpacity>
            <InputPassword 
                      placeholder='New Password'
                      setText={setNewPassword} value={newPassword}              />
                <View style={{margin:10}}/>
            <InputPassword 
                      placeholder='Repeat New Password'
                      setText={setRepeat} value={repeat}              />
                <View style={{margin:10}}/>
            </View>
            <Button text={'SAVE PASSWORD'} disabled={disable()} onPress={handleChange} isLoading={buttonLoad}/>
        </View>
    </CustomModal>
  );
}


const styles = StyleSheet.create({
 content:{
    width:'100%',
    padding:20,
    flex:1,
},
 buttons:{
    flex:1
 },
 button:{
    paddingHorizontal:30,
    paddingVertical:10,
    borderColor:"#9b9b9b",
    borderRadius:8
 },
 forgot:{
    marginTop:7,
    marginBottom:10,
    alignItems:'flex-end'
},
});