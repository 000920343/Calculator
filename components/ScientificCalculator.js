import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { evaluate } from 'mathjs';

export default function ScientificCalculator({ navigation }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isDegreeMode, setIsDegreeMode] = useState(true); // Default mode is degrees
  const [history, setHistory] = useState([]);

  const handlePress = (value) => {
    if (value === '=') {
      try {
        let expression = input;

        if (isDegreeMode) {
          expression = expression
            .replace(/sin\(/g, 'Math.sin(Math.PI/180*')
            .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
            .replace(/tan\(/g, 'Math.tan(Math.PI/180*');
        } else {
          expression = expression
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(');
        }

        const evaluatedResult = evaluate(expression);
        setResult(evaluatedResult.toString());
        setHistory([...history, { expression: input, result: evaluatedResult.toString() }]);
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

  const handleScientificFunction = (func) => {
    try {
      const lastNumber = input.match(/-?\d+(\.\d+)?$/)?.[0]; // Extract the last number
      if (!lastNumber) return;

      const number = parseFloat(lastNumber);
      let scientificResult = '';

      switch (func) {
        case 'sin':
          scientificResult = `sin(${number}) = ` + Math.sin(isDegreeMode ? (number * Math.PI) / 180 : number).toFixed(4);
          break;
        case 'cos':
          scientificResult = `cos(${number}) = ` + Math.cos(isDegreeMode ? (number * Math.PI) / 180 : number).toFixed(4);
          break;
        case 'tan':
          scientificResult = `tan(${number}) = ` + Math.tan(isDegreeMode ? (number * Math.PI) / 180 : number).toFixed(4);
          break;
        case '√':
          scientificResult = `√(${number}) = ` + Math.sqrt(number).toFixed(4);
          break;
        case 'log':
          scientificResult = `log(${number}) = ` + Math.log10(number).toFixed(4);
          break;
        case 'ln':
          scientificResult = `ln(${number}) = ` + Math.log(number).toFixed(4);
          break;
        case 'e^x':
          scientificResult = `e^(${number}) = ` + Math.exp(number).toFixed(4);
          break;
        case 'π':
          setInput((prev) => prev + Math.PI.toFixed(4));
          return;
        case 'e':
          setInput((prev) => prev + Math.E.toFixed(4));
          return;
        default:
          return;
      }

      setResult(scientificResult);
      setInput('');
    } catch {
      setResult('Error');
    }
  };

  const toggleMode = () => {
    setIsDegreeMode(!isDegreeMode);
    alert(`Mode switched to ${isDegreeMode ? 'Radians' : 'Degrees'}`);
  };

  const scientificButtons = [
    '2nd', '(', ')', 'π', 'e',
    '1/x', 'x^2', 'x^3', 'x^y', 'x!',
    'sin', 'cos', 'tan', 'sinh', 'cosh',
    'log', 'ln', '10^x', 'Rand', '√',
    '7', '8', '9', '/', 'mc',
    '4', '5', '6', '*', 'm+',
    '1', '2', '3', '-', 'm-',
    '+/-', '0', '.', '=', 'mr'
  ];

  return (
    <View style={styles.container}>
      {/* Display Section */}
      <View style={styles.displayContainer}>
        <Text style={styles.input}>{input || '0'}</Text>
        <View style={styles.resultRow}>
          <Text style={styles.result}>{result}</Text>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Svg
              width="31"
              height="32"
              viewBox="0 0 31 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M9.24275 7.26068L3.08035 15.8415L9.24275 24.4222H27.7299V7.26068H9.24275Z"
                stroke="#3C6E71"
                strokeWidth="2.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M13.5564 12.5411L19.7188 19.1417"
                stroke="#3C6E71"
                strokeWidth="2.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M19.7188 12.5411L13.5564 19.1417"
                stroke="#3C6E71"
                strokeWidth="2.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Basic')}
        >
          <Ionicons name="grid-outline" size={24} color="#004d40" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('History', { history })}
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
        <TouchableOpacity
          style={styles.navButton}
          onPress={toggleMode}
        >
          <Text style={styles.toggleModeText}>{isDegreeMode ? 'Deg' : 'Rad'}</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons Section */}
      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        {scientificButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              button === '=' && styles.equalsButton,
              button === 'AC' && styles.acButton,
              ['sin', 'cos', 'tan', 'sinh', 'cosh', 'log', 'ln', 'e^x', 'π', 'e', '√'].includes(button) && styles.scientificButton,
              ['(', ')'].includes(button) && styles.bracketButton,
            ]}
            onPress={() =>
              ['sin', 'cos', 'tan', 'sinh', 'cosh', 'log', 'ln', 'e^x', 'π', 'e', '√'].includes(button)
                ? handleScientificFunction(button)
                : handlePress(button)
            }
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
      </ScrollView>
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
    justifyContent: 'center',
    elevation: 3,
  },
  input: {
    fontSize: 24,
    color: '#000',
    textAlign: 'right',
    marginBottom: 10,
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
    textAlign: 'right',
  },
  clearButton: {
    width: 31,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  toggleModeText: {
    fontSize: 16,
    color: '#004d40',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: '#d1d1d1',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#f5f5f5',
    width: '18%', // Adjusted to fit more buttons per row like iPhone layout
    height: 60,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  equalsButton: {
    backgroundColor: '#80cbc4',
  },
  acButton: {
    backgroundColor: '#000',
  },
  scientificButton: {
    backgroundColor: '#80cbc4',
  },
  bracketButton: {
    backgroundColor: '#000',
  },
  specialButtonText: {
    color: '#ffffff',
  },
});
