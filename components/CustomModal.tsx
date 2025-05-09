import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { ThemedView } from "./ThemedView";

const { height } = Dimensions.get("window");

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heightPercentage?: number;
  backdropOpacity?: number;
  style?:any;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  children,
  heightPercentage = 0.4,
  backdropOpacity = 0.5,
  style
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      backdropOpacity={backdropOpacity}
      style={[styles.modal, style]}
    >
      <ThemedView style={[styles.modalContent, { height: height * heightPercentage }]} lightColor={Colors.light.background} darkColor='#000'>
        <View style={styles.bar}/>
        <ScrollView contentContainerStyle={{alignItems: "center", flexGrow:1}} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    
  },
  bar:{
    width:60,
    height:6,
    backgroundColor:'#9B9B9B',
    borderRadius:3,
    marginBottom:16,
    alignSelf:'center'
  },
});

export default CustomModal;
