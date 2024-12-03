import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const MainScreen = () => {
  const [baseCurrency, setBaseCurrency] = useState('CAD');
  const [destinationCurrency, setDestinationCurrency] = useState('');
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const fetchExchangeRate = async () => {
    if (!destinationCurrency) {
      Alert.alert('Error', 'Please enter the destination currency');
      return;
    }
    try {
      const response = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_HeQksuKtT0wkj8JMr4tVWUaY2RylPoLLB7kd5iFq&base_currency=${baseCurrency}`
      );
      const data = await response.json();

      if (response.ok && data.data[destinationCurrency]) {
        const rate = data.data[destinationCurrency];
        const result = (rate * parseFloat(amount)).toFixed(2);
        setConvertedAmount(`${amount} ${baseCurrency} = ${result} ${destinationCurrency}`);
      } else {
        Alert.alert('Error', 'Invalid currency code or API issue');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  return (
    <LinearGradient colors={['#f0f8ff', '#87ceeb']} style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <TextInput
        style={styles.input}
        placeholder="Base Currency (e.g., CAD)"
        value={baseCurrency}
        onChangeText={setBaseCurrency}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination Currency (e.g., USD)"
        value={destinationCurrency}
        onChangeText={setDestinationCurrency}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount (default: 1)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={fetchExchangeRate}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>
      {convertedAmount && (
        <Animatable.Text animation="bounceIn" style={styles.result}>
          {convertedAmount}
        </Animatable.Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e90ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191970',
    textAlign: 'center',
  },
});

export default MainScreen;
