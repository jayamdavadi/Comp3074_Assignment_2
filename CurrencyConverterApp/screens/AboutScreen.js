import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const AboutScreen = () => (
  <LinearGradient colors={['#1e90ff', '#87ceeb']} style={styles.container}>
    <Animatable.View animation="fadeIn" duration={1500} style={styles.content}>
      <Image
        source={require('../assets/Profile_pic.png')}
        style={styles.profilePic}
      />
      <Text style={styles.name}>Jay Ishwarbhai Amdavadi</Text>
      <Text style={styles.id}>Student ID: 101435982</Text>
    </Animatable.View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  profilePic: {
    width: 120, 
    height: 120,
    borderRadius: 60, 
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff', 
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  id: {
    fontSize: 18,
    color: '#f0f8ff',
    marginTop: 10,
  },
});

export default AboutScreen;
