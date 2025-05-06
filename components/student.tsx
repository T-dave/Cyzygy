import { ImageBackground, Text, ScrollView, StyleSheet, TouchableOpacity, Image, View, Dimensions, Modal } from 'react-native';
import { ThemedView } from './ThemedView';
import { router } from 'expo-router';
import { ThemedText } from './ThemedText';
import { useState } from 'react';

interface Products{
    data:any;
    onPress:any;
    onDelete:any;
}
export default function StudentCard  ({ data, onPress, onDelete }: Products) {
    const [showModal, setShowModal] = useState(false);

  return (
    <>
        <TouchableOpacity 
            onPress={onPress}
            onLongPress={() => setShowModal(true)}
            delayLongPress={500}
        >
            <View style={styles.bag}>
            <Image source={{ uri:data.image }} style={styles.image}/>
            <ThemedView lightColor='#FFF' style={styles.right}>
                <View>
                    <ThemedText type='defaultSemiBold'>
                        {data.name}
                    </ThemedText>
                    <View style={{margin:5}}/>
                    <ThemedText>
                        {data.email}
                    </ThemedText>
                </View>
                <View style={styles.statusView}>
                    <ThemedText 
                        type='small' 
                        lightColor={data.status==="Enrolled" ? "#FFC000" : data.status==="Graduated" ? "green" : "blue"}
                        darkColor={data.status==="Enrolled" ? "#FFC000" : data.status==="Graduated" ? "green" : "blue"}
                        style={{fontWeight:600}}
                    >
                        {data.status}
                    </ThemedText>
                </View>
            </ThemedView>
            </View>
        </TouchableOpacity>

            <Modal
            visible={showModal}
            transparent={true}
            animationType="fade"
            >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        You are about to Delete {data.name}'s record
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
                            onPress={() => {
                                onDelete(data.id);
                                setShowModal(false);
                            }}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </Modal>
</>
  );
}


const styles = StyleSheet.create({
    bag:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    image:{
        width:104,
        height:104,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8
    },
    right:{
        flex:1,
        paddingLeft:16,
        justifyContent:'center',
        paddingVertical:8,
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
    },
    statusView:{
        width:'100%',
        alignItems:'flex-end',
        paddingRight:8
    },
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    types:{
        flexDirection:'row',
        alignItems:'center'
    },
    circles:{
        padding:10
    },
    circle:{
        width:4,
        height:4,
        backgroundColor:'#AAA',
        borderRadius:15,
        margin:2
    },
    changes:{
        flexDirection:'row',
        alignItems:'center',
    },
    pop:{
        position:'absolute',
        flex:1,
        zIndex:2,
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    popUp:{
        backgroundColor:'#FFF',
        width:170,
        borderRadius:8,
        zIndex:2,
        left:50
    },
    popUpButton:{
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#9B9B9B25',
    },
    
    shadow: {
        position: "absolute",
        width: 250,
        height: '100%', // Shadow height
        borderRadius: 8,
        left:100
    },
    bottom:{
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between',
        paddingRight:16
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
    
    // Press effect for modal buttons
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
});






