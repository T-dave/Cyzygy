import { FlatList, StyleSheet, View } from 'react-native';
import StudentCard from './student';
import { ScrollView } from 'react-native-gesture-handler';
import Storage from '@/hooks/handleStorage';
import { useEffect, useRef } from 'react';

interface Bags {
    data: any;
    onDelete: any;
    status:any;
    ref:any
}

export default function Students({ data, onDelete, status, ref }: Bags) {


  const newData = ()=>{
    if (status === "All"){
      return data
    }else{
      return data.filter((student: { status: string; }) => student.status == status)
    }
  }
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
      ref={ref}
    >
      {newData().map((item: any, index: any) => (
        <View key={index} style={styles.bag}>
          <StudentCard 
            data={item} 
            onPress={() => console.log("Hii")} 
            onDelete={onDelete}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    bag: {
        marginVertical: 10,
    },
    container: {
        paddingTop: 5,
        marginHorizontal: 16
    },
});