import { ImageBackground, Keyboard, ScrollView, StyleSheet, TouchableOpacity, Image, View, Alert, Pressable, Text, Dimensions, Switch, Modal } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { ThemedScroll } from '@/components/ThemedScroll';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '@/components/button';
import Constants from 'expo-constants';
import { InputPassword, InputText } from '@/components/input';
import SettingsModal from '@/components/settingsModal';
import Top from '@/components/top';
import { primary } from '@/constants/Colors';
import Storage from '@/hooks/handleStorage';

export default function SettingScreen() {
  const { changeNoti, changeTheme, user, deleteAll } = Storage();

  const [isNotification, setIsNotification] = useState(false);
  const toggleNotification = () => {
    setIsNotification(previousState => !previousState);
    changeNoti();
  };
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => {
    setIsDark(previousState => !previousState);
    changeTheme();
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [admin, setAdmin] = useState("David Omotara");
  function getInitials(fullName: string) {
    if (!fullName) {
      return '';
    }
  
    const names = fullName.trim().split(' ');
  
    if (names.length < 2) {
      return '';
    }
  
    const firstInitial = names[0][0].toUpperCase();
    const lastInitial = names[1][0].toUpperCase();
  
    return firstInitial + lastInitial;
  }

  return (
    <ThemedScroll>
        <Top topText="Settings"/>
        <View style={styles.mid}>
            <View>
              <View style={styles.name}>
                <View style={styles.initials}>
                    <ThemedText type='subtitle' style={{color:"#FFF"}}>{getInitials(admin)}</ThemedText>
                </View>
                <ThemedText type='subtitle'>{admin}</ThemedText>
              </View>
              <ThemedText type='defaultSemiBold'>tomyomo@gmail.com</ThemedText>
              <View style={{margin:8}}/>
            </View>

            <View style={{marginBottom:10}}>
              <View style={styles.toggleView}>
                <ThemedText>Enable Notifications</ThemedText>
                <Switch
                    trackColor={{false: '#767577', true: '#0000FF33'}}
                    thumbColor={user.notifications ? primary : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotification}
                    value={user.notifications}
                  />
              </View>

              <View style={styles.toggleView}>
                <ThemedText>Dark Mode</ThemedText>
                <Switch
                    trackColor={{false: '#767577', true: '#0000FF33'}}
                    thumbColor={!user.lightTheme ? primary : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDark}
                    value={!user.lightTheme}
                  />
              </View>
            </View>

            <TouchableOpacity onPress={()=>setModalVisible(true)} style = {styles.changePassword}>
                <ThemedText type='defaultSemiBold' style={{fontWeight:"500"}}>Change Password</ThemedText>
                <Image 
                    source={require("../../assets/images/rightGrey.png")} 
                    style={{width:15, height:15}} 
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setShowModal(true)} style = {styles.changePassword}>
                <ThemedText type='defaultSemiBold' style={{fontWeight:"500", color:'#F00'}} >Delete all Data</ThemedText>
                <MaterialIcons color={"#F00"} size={20} name={'delete'}/>
            </TouchableOpacity>
        </View>
        <SettingsModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <Modal
            visible={showModal}
            transparent={true}
            animationType="fade"
            >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        Are you sure you want to delete ALL STUDENTS DATA?
                    </Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity 
                            style={styles.cancelButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={() => deleteAll}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </Modal>
    </ThemedScroll>
  );
}


const styles = StyleSheet.create({
  top:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom:10,
    paddingHorizontal:10
  },
  mid:{
    padding:16
  },
  profileView:{
    flexDirection:'row',
    marginTop:20
  },
  settingCard:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  passwordTop:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  toggleView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  initials:{
    padding:10,
    backgroundColor:"grey",
    borderRadius:50,
    marginRight:10
  },
  name:{
    marginBottom:8,
    flexDirection:'row',
    alignItems:'center'
  },
  changePassword:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#FFF',
    padding:15,
    borderRadius:8,
    marginBottom:10
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
},
modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
},
cancelButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 100,
    alignItems: 'center',
},
deleteButton: {
  padding: 10,
  borderRadius: 5,
  backgroundColor: '#ff4444',
  minWidth: 100,
  alignItems: 'center',
},
deleteText: {
  color: 'white',
  fontWeight: 'bold',
},
});