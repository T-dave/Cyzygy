import { Keyboard, Modal, ScrollView, StyleSheet, TouchableWithoutFeedback, View, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Constants from 'expo-constants';
import Mid2 from './comp/mid2';
import Top from '@/components/top';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import Button from '@/components/button';
import { ThemedScroll } from '@/components/ThemedScroll';
import Storage from '@/hooks/handleStorage';
import { Base64 } from 'js-base64';



export default function LogInScreen() {
  const { user, fetchUser, buttonLoad, setButtonLoad } = Storage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
      fetchUser();
    },[]);

    const disable = ()=>{
        if (email.length>3 && /\S+@\S+\.\S+/.test(email) && password.length>6){
            return false;
        }else return true;
    }
    const handleAuth=()=>{
      setButtonLoad(true);
      const encryptedPassword = Base64.encode(password);
      if(encryptedPassword === user.password){
        setButtonLoad(false);
        router.navigate('/(tabs)');
      }else{
        setShowModal(true);
        setButtonLoad(false);
      }
    }
  return (
    <>
    <ThemedScroll>
          <Top topText='Sign In'/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Mid2 setEmail={setEmail} setPassword={setPassword} />
                    </View>
                    <Button text={'Sign In'} disabled = {disable()} onPress={handleAuth} isLoading={buttonLoad}/>
                </View>
            </TouchableWithoutFeedback>
    </ThemedScroll>
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      >
      <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                  Incorrect Password
              </Text>
              <View style={styles.modalButtons}>
                  <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => setShowModal(false)}
                  >
                      <Text>Retry</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </View>
    </Modal>
    </>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flex:1,
    paddingHorizontal: 16
  },
  container:{
    flex:1, 
    paddingHorizontal:8, 
    paddingBottom:16
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
}
});
