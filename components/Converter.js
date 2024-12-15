import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function UnitConverter() {
  const [category, setCategory] = useState('distance');
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('');
  const [outputUnit, setOutputUnit] = useState('');
  const [result, setResult] = useState('');

  const unitOptions = {
    distance: ['meters', 'kilometers', 'miles'],
    weight: ['grams', 'kilograms', 'pounds'],
    time: ['seconds', 'minutes', 'hours'],
    currency: ['USD', 'EUR', 'INR'],
    speed: ['m/s', 'km/h', 'mph'],
    length: ['centimeters', 'meters', 'kilometers'],
  };

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }

    if (!inputUnit || !outputUnit) {
      Alert.alert('Invalid Selection', 'Please select both input and output units.');
      return;
    }

    let conversionResult = 0;

    switch (category) {
      case 'distance':
        if (inputUnit === 'meters' && outputUnit === 'kilometers') {
          conversionResult = value / 1000;
        } else if (inputUnit === 'kilometers' && outputUnit === 'meters') {
          conversionResult = value * 1000;
        } else if (inputUnit === 'miles' && outputUnit === 'kilometers') {
          conversionResult = value * 1.60934;
        } else if (inputUnit === 'kilometers' && outputUnit === 'miles') {
          conversionResult = value / 1.60934;
        } else {
          conversionResult = value; // Same unit
        }
        break;

      case 'weight':
        if (inputUnit === 'grams' && outputUnit === 'kilograms') {
          conversionResult = value / 1000;
        } else if (inputUnit === 'kilograms' && outputUnit === 'grams') {
          conversionResult = value * 1000;
        } else if (inputUnit === 'pounds' && outputUnit === 'kilograms') {
          conversionResult = value * 0.453592;
        } else if (inputUnit === 'kilograms' && outputUnit === 'pounds') {
          conversionResult = value / 0.453592;
        } else {
          conversionResult = value; // Same unit
        }
        break;

      case 'time':
        if (inputUnit === 'seconds' && outputUnit === 'minutes') {
          conversionResult = value / 60;
        } else if (inputUnit === 'minutes' && outputUnit === 'seconds') {
          conversionResult = value * 60;
        } else if (inputUnit === 'minutes' && outputUnit === 'hours') {
          conversionResult = value / 60;
        } else if (inputUnit === 'hours' && outputUnit === 'minutes') {
          conversionResult = value * 60;
        } else {
          conversionResult = value; // Same unit
        }
        break;

      case 'currency':
        // Mock conversion rates (these can be updated with real API rates)
        const rates = { USD: 1, EUR: 0.85, INR: 74.57 };
        conversionResult = (value / rates[inputUnit]) * rates[outputUnit];
        break;

      case 'speed':
        if (inputUnit === 'm/s' && outputUnit === 'km/h') {
          conversionResult = value * 3.6;
        } else if (inputUnit === 'km/h' && outputUnit === 'm/s') {
          conversionResult = value / 3.6;
        } else if (inputUnit === 'mph' && outputUnit === 'km/h') {
          conversionResult = value * 1.60934;
        } else if (inputUnit === 'km/h' && outputUnit === 'mph') {
          conversionResult = value / 1.60934;
        } else {
          conversionResult = value; // Same unit
        }
        break;

      case 'length':
        if (inputUnit === 'centimeters' && outputUnit === 'meters') {
          conversionResult = value / 100;
        } else if (inputUnit === 'meters' && outputUnit === 'centimeters') {
          conversionResult = value * 100;
        } else if (inputUnit === 'meters' && outputUnit === 'kilometers') {
          conversionResult = value / 1000;
        } else if (inputUnit === 'kilometers' && outputUnit === 'meters') {
          conversionResult = value * 1000;
        } else {
          conversionResult = value; // Same unit
        }
        break;

      default:
        conversionResult = 'Error';
        break;
    }

    setResult(conversionResult.toFixed(4));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>

      {/* Select Conversion Category */}
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => {
          setCategory(itemValue);
          setInputUnit('');
          setOutputUnit('');
          setResult('');
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select Conversion Category" value="" />
        <Picker.Item label="Distance" value="distance" />
        <Picker.Item label="Weight" value="weight" />
        <Picker.Item label="Time" value="time" />
        <Picker.Item label="Currency" value="currency" />
        <Picker.Item label="Speed" value="speed" />
        <Picker.Item label="Length" value="length" />
      </Picker>

      {/* Select Input Unit */}
      <Picker
        selectedValue={inputUnit}
        onValueChange={(itemValue) => setInputUnit(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Input Unit" value="" />
        {unitOptions[category]?.map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      {/* Select Output Unit */}
      <Picker
        selectedValue={outputUnit}
        onValueChange={(itemValue) => setOutputUnit(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Output Unit" value="" />
        {unitOptions[category]?.map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter Value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />

      {/* Convert Button */}
      <TouchableOpacity style={styles.convertButton} onPress={convert}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>

      {/* Result Display */}
      <Text style={styles.result}>{result && `Result: ${result}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d8e6e7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff',
  },
  convertButton: {
    backgroundColor: '#004d40',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    color: '#333',
  },
});
