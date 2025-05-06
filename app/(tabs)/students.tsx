import { ImageBackground, Keyboard, ScrollView, StyleSheet, TouchableOpacity, Image, View, Alert, Pressable, Text, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Top from '@/components/top';
import Students from '@/components/students';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import Storage from '@/hooks/handleStorage';
import { MaterialIcons } from '@expo/vector-icons';
import { primary } from '@/constants/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { ThemedText } from '@/components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { UserInfo } from '@/userInfo';


export default function StudentScreen() {
  const { students, fetchStudents, deleteStudent, fetchUser, user, changeStatus } = Storage();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchUser();
    fetchStudents();
    scrollRef.current?.scrollToEnd({ animated: true });
    
  },[students]);

  const onDelete=(id: any)=>{
    deleteStudent(id);
    console.log(`Deleted ${id}`)
  }

  const data = [
    { label: 'All', value: '1' },
    { label: 'Enrolled', value: '2' },
    { label: 'Graduated', value: '3' },
    { label: 'Alumni', value: '4' },
  
  ];

  const [isFocus, setIsFocus] = useState(false);

  return (
    <ThemedView style={{flex:1}}>
      <Top topText="Students"/>
      <View style={styles.container}>
                        <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={""}
                        value={user.status}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            changeStatus(item.label)
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="filter"
                            size={25}
                            />
                        )}
                        />
        </View>
        <Students data = {students} onDelete={onDelete} status={user.status} ref={scrollRef}/>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
  },
  dropdown: {
    justifyContent:'flex-start',
    flexDirection:'row-reverse'
  },
  icon: {
    paddingHorizontal: 16,
    alignSelf:'flex-end'
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
    width: 0,
    height: 0,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});