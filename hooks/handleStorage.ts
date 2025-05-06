import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useState } from 'react';
import API_URL from '@/constants/url';
import { Alert, ScrollView, InteractionManager } from 'react-native';
import clientId from '@/constants/image';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

const Storage = ()=>{
    const [students, setStudents] = useState<any>([]);
    const [user, setUser] = useState<any>([]);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newStatus, setNewStatus] = useState(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [index, setIndex] = useState(0);
    const [imageLoad, setImageLoad] = useState(false);
    const [buttonLoad, setButtonLoad] = useState(false);

    const showToast = (message: string, type='success') => {
        Toast.show({
          type: type,
          text1: 'Success',
          text2: message
        });
      }
    

    const fetchStudents = async () => {
        try {
        const res = await fetch(`${API_URL}/students`);
        const data = await res.json();
        setStudents(data);
        } catch (err) {
        console.log('API failed, loading from AsyncStorage...');
        const localData = await AsyncStorage.getItem('students');
        if (localData) setStudents(JSON.parse(localData));
        }
    };

    const fetchUser = async () => {
        try {
        const res = await fetch(`${API_URL}/user`);
        const data = await res.json();
        setUser(data[0]);
        } catch (err) {
        console.log('API failed, loading from AsyncStorage...');
        const localData = await AsyncStorage.getItem('user');
        if (localData) setUser(JSON.parse(localData));
        }
    };

    const addStudent = async () => {
        if (!newName) return;
        setButtonLoad(true)
        const studentObj = { name: newName, email: newEmail, status: newStatus, image:imageUri };
        try {
        const res = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentObj),
        })
        const added = await res.json();
        const updatedList = [...students, added];
        setStudents(updatedList);
        await AsyncStorage.setItem('students', JSON.stringify(updatedList));
        await fetchStudents();
        console.log(`index is ${index}`);
        showToast('The new student has been added');
        setImageUri(null);
        setNewName('');
        setNewEmail('');
        setNewStatus(null);
        setButtonLoad(false);
        } catch (err) {
        Alert.alert('Error', 'Failed to add student');
        setButtonLoad(false);
        }
    };

   
        const changeNoti = async () => {
            try {
              const response = await fetch(`${API_URL}/user/de58`);
              const user = await response.json();
          
              const updatedUser = { ...user, notifications: !user.notifications };
          
              const updateResponse = await fetch(`${API_URL}/user/de58`, {
                method: 'PUT', // or 'PATCH' if you only want to update part of it
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
              });
          
              if (updateResponse.ok) {
                console.log('User updated successfully');
                fetchUser();
              } else {
                console.error('Failed to update user');
              }
            } catch (error) {
              console.error('Error updating user:', error);
            }
          };

          const changeTheme = async () => {
            try {
              const response = await fetch(`${API_URL}/user/de58`);
              const user = await response.json();
          
              const updatedUser = { ...user, lightTheme: !user.lightTheme };
          
              const updateResponse = await fetch(`${API_URL}/user/de58`, {
                method: 'PUT', // or 'PATCH' if you only want to update part of it
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
              });
          
              if (updateResponse.ok) {
                console.log('User updated successfully');
                fetchUser();
              } else {
                console.error('Failed to update user');
              }
            } catch (error) {
              console.error('Error updating user:', error);
            }
          };

          const changeStatus = async (status: string) => {
            try {
              const response = await fetch(`${API_URL}/user/de58`);
              const user = await response.json();
              console.log(user)
          
              const updatedUser = { ...user, status: status };
          
              const updateResponse = await fetch(`${API_URL}/user/de58`, {
                method: 'PUT', // or 'PATCH' if you only want to update part of it
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
              });
          
              if (updateResponse.ok) {
                console.log('User updated successfully');
              } else {
                console.error('Failed to update user');
              }
            } catch (error) {
              console.error('Error updating user:', error);
            }
          };

          const changePassword = async (password: string) => {
            try {
              const response = await fetch(`${API_URL}/user/de58`);
              const user = await response.json();
              console.log(user)
          
              const updatedUser = { ...user, password: password };
          
              const updateResponse = await fetch(`${API_URL}/user/de58`, {
                method: 'PUT', // or 'PATCH' if you only want to update part of it
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
              });
          
              if (updateResponse.ok) {
                console.log('User updated successfully');
                showToast('Password changed');
              } else {
                console.error('Failed to update user');
              }
            } catch (error) {
              console.error('Error updating user:', error);
            }
          };

    const deleteStudent = async (id: string) => {
        try {
          // Delete from json-server
          const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete from server');
          }
      
          // Delete from AsyncStorage
          const localData = await AsyncStorage.getItem('students');
          if (localData) {
            const students = JSON.parse(localData);
            const updatedStudents = students.filter((student: { id: string; }) => student.id !== id);
            await AsyncStorage.setItem('students', JSON.stringify(updatedStudents));
            
          }
          showToast('Record deleted');
          return true; // Indicate success
          
        } catch (error) {
          console.error('Delete error:', error);
          return false; // Indicate failure
        }
      };

    const uploadProfilePicture = async () => {
        // Request permission to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (permissionResult.granted === false) {
          Alert.alert('Permission to access camera roll is required!');
          return;
        }
      
        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (result.canceled) {
          console.log('User cancelled image picker');
          setImageLoad(false);
          return;
        }
        console.log(1)
        
        const { uri } = result.assets[0]; // Get the image URI
        const formData = new FormData();
        formData.append('image', {
            uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
          } as unknown as Blob);

        try {
            setImageLoad(true);
            const response = await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    Authorization: `Client-ID ${clientId}`,
                },
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setImageLoad(false);
                Alert.alert('Image uploaded successfully!', data.data.link);
                setImageUri(data.data.link);
            } else {
                Alert.alert('Upload failed', data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error uploading image');
        }
    };

    const deleteAll = async () => {
        try {
          const res = await fetch('http://<YOUR-IP>:3000/students');
          const students = await res.json();
      
          await Promise.all(
            students.map((student: { id: any; }) =>
              fetch(`http://<YOUR-IP>:3000/students/${student.id}`, {
                method: 'DELETE',
              })
            )
          );
      
          console.log('All students deleted from json-server');
          showToast('All students deleted from json-server');
        } catch (error) {
          console.error('Error clearing json-server:', error);
        }

        try {
            await AsyncStorage.removeItem('students');
            console.log('All students cleared from AsyncStorage', 'failed');
          } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
          }
      };
      

    return {
        students,
        newName,
        setNewName,
        newEmail,
        setNewEmail,
        newStatus,
        setNewStatus,
        fetchStudents,
        addStudent,
        imageUri,
        uploadProfilePicture,
        index,
        setIndex,
        deleteStudent,
        changeNoti,
        changeStatus,
        changeTheme,
        fetchUser,
        user,
        deleteAll,
        changePassword,
        imageLoad,
        buttonLoad,
        setButtonLoad,
      };
};

export default Storage;