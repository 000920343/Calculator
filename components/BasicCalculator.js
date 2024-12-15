import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BasicCalculator({ navigation }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = async (value) => {
    if (value === '=') {
      try {
        const evaluatedResult = eval(input).toString();
        setResult(evaluatedResult);

        // Save calculation to AsyncStorage
        const calculation = { input, result: evaluatedResult };
        const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
        history.push(calculation);
        await AsyncStorage.setItem('history', JSON.stringify(history));
      } catch {
        setResult('Error');
      }
    } else if (value === 'AC') {
      setInput('');
      setResult('');
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setInput((prev) => prev.slice(0, -1)); // Remove the last character
  };

  const buttons = [
    ['AC', '(', ')', '%'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['+/-', '0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      {/* Display Section */}
      <View style={styles.displayContainer}>
        <Text style={styles.input}>{input || '0'}</Text>
        <View style={styles.resultRow}>
          <Text style={styles.result}>{result}</Text>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Ionicons name="backspace-outline" size={24} color="#3C6E71" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Scientific')}
        >
          <Ionicons name="grid-outline" size={24} color="#004d40" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('History')}
        >
          <Ionicons name="time-outline" size={24} color="#004d40" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Graphical')}
        >
          <Ionicons name="trending-up-outline" size={24} color="#004d40" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Converter')}
        >
          <Ionicons name="swap-horizontal-outline" size={24} color="#004d40" />
        </TouchableOpacity>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  styles.button,
                  button === '=' && styles.equalsButton,
                  button === 'AC' && styles.acButton,
                  ['/', '*', '-', '+', '%'].includes(button) &&
                    styles.operatorButton,
                  ['(', ')'].includes(button) && styles.bracketButton,
                ]}
                onPress={() => handlePress(button)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    (button === 'AC' || ['(', ')'].includes(button)) &&
                      styles.specialButtonText,
                  ]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Meet the Team Link */}
      <TouchableOpacity
        style={styles.teamLink}
        onPress={() => navigation.navigate('Team Participants')}
      >
        <Text style={styles.teamLinkText}>Meet the Team</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8e6e7',
    padding: 10,
  },
  displayContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    flex: 1.5,
    justifyContent: 'center',
  },
  input: {
    fontSize: 24,
    color: '#000',
    textAlign: 'right',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  result: {
    fontSize: 32,
    color: '#004d40',
    fontWeight: 'bold',
  },
  clearButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 4.5,
    backgroundColor: '#d1d1d1',
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    margin: 5,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  equalsButton: {
    backgroundColor: '#80cbc4',
  },
  operatorButton: {
    backgroundColor: '#004d40',
  },
  acButton: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialButtonText: {
    color: '#ffffff',
  },
  bracketButton: {
    backgroundColor: '#000',
  },
  teamLink: {
    alignItems: 'center',
    marginTop: 20,
  },
  teamLinkText: {
    color: '#004d40',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
