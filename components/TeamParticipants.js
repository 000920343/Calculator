import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';

const participants = [
  {
    name: 'Shubhampreet Singh',
    role: 'Interface Design',
    details: 'I was responsible for designing the user interface for the calculator. I ensured the design is user-friendly, modern, and responsive across devices.',
    image: require('../public/shubham.jpg'),
  },
  {
    name: 'Jashanpreet Singh',
    role: 'Scientific Calculator',
    details: 'I implemented the scientific calculator functionality. I included advanced features like trigonometric, logarithmic, and exponential calculations.',
    image: require('../public/jashan.jpg'),
  },
  {
    name: 'Jaskaran Singh Gill',
    role: 'Graphical Calculator',
    details: 'I developed the graphical calculator module. I plotted graphs dynamically for user input functions using responsive layouts.',
    image: require('../public/jaskaran.jpg'),
  },
  {
    name: 'Deepak Sharma',
    role: 'History & Storage',
    details: 'I worked on the history and storage functionality. I ensured all calculations are stored persistently for easy access.',
    image: require('../public/Deepak.jpg'),
  },
  {
    name: 'Pryanshu Lal',
    role: 'Converter Module',
    details: 'I created the converter module. I enabled users to convert values between units like length, weight, speed, and currency.',
    image: require('../public/pryanshu.jpg'),
  },
];

// Get screen width for responsiveness
const { width } = Dimensions.get('window');

export default function TeamParticipants() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (member) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMember(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meet the Team</Text>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {participants.map((member, index) => (
          <TouchableOpacity key={index} style={[styles.card, { width: width * 0.9 }]} onPress={() => openModal(member)}>
            <Image source={member.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.role}>{member.role}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>✨</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for Team Member Details */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedMember && (
              <>
                <Image source={selectedMember.image} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedMember.name}</Text>
                <Text style={styles.modalRole}>{selectedMember.role}</Text>
                <Text style={styles.modalDetails}>{selectedMember.details}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f5', // Light pastel green
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004d40',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  cardContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: width > 400 ? 70 : 50,
    height: width > 400 ? 70 : 50,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#80cbc4',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004d40',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  iconContainer: {
    backgroundColor: '#80cbc4',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: width * 0.85,
    alignItems: 'center',
    elevation: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#80cbc4',
    marginBottom: 15,
  },
  modalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 5,
  },
  modalRole: {
    fontSize: 18,
    color: '#00796b',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#80cbc4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
