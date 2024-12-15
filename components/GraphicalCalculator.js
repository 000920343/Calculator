import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function GraphicalCalculator({ navigation }) {
  const [expression, setExpression] = useState('');
  const [dataPoints, setDataPoints] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const storedHistory = JSON.parse(await AsyncStorage.getItem('graphHistory')) || [];
    setHistory(storedHistory);
  };

  const saveHistory = async (expr) => {
    const newHistory = [...history, expr];
    setHistory(newHistory);
    await AsyncStorage.setItem('graphHistory', JSON.stringify(newHistory));
  };

  const plotGraph = () => {
    try {
      const xValues = Array.from({ length: 21 }, (_, i) => i - 10);
      const yValues = xValues.map((x) => {
        let replacedExpr = expression.replace(/x/g, `(${x})`);
        return eval(replacedExpr); // Evaluate the function with x replaced
      });

      setDataPoints(yValues);
      saveHistory(expression);
    } catch (e) {
      Alert.alert('Invalid Expression', 'Please enter a valid mathematical expression using "x" as the variable.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Graphical Calculator</Text>
      </View>

      {/* Navigation */}
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Basic')} style={styles.navButton}>
          <Ionicons name="calculator-outline" size={24} color="#3C6E71" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Scientific')} style={styles.navButton}>
          <Ionicons name="grid-outline" size={24} color="#3C6E71" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.navButton}>
          <Ionicons name="time-outline" size={24} color="#3C6E71" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Converter')} style={styles.navButton}>
          <Ionicons name="swap-horizontal-outline" size={24} color="#3C6E71" />
        </TouchableOpacity>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter function e.g., Math.sin(x)"
          value={expression}
          onChangeText={setExpression}
        />
        <TouchableOpacity style={styles.plotButton} onPress={plotGraph}>
          <Text style={styles.plotButtonText}>PLOT GRAPH</Text>
        </TouchableOpacity>
      </View>

      {/* Graph */}
      {dataPoints.length > 0 && (
        <LineChart
          data={{
            labels: Array.from({ length: 21 }, (_, i) => (i - 10).toString()),
            datasets: [{ data: dataPoints }],
          }}
          width={Dimensions.get('window').width - 20}
          height={300}
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#1E2923',
            backgroundGradientFrom: '#3C6E71',
            backgroundGradientTo: '#284B63',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#FFA726',
            },
          }}
          bezier
          style={styles.graphStyle}
        />
      )}

      {/* History */}
      <ScrollView style={styles.historyContainer}>
        <Text style={styles.historyTitle}>History</Text>
        {history.map((item, index) => (
          <Text key={index} style={styles.historyText}>
            {item}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  navButton: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#3C6E71',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  plotButton: {
    backgroundColor: '#3C6E71',
    padding: 10,
    borderRadius: 8,
  },
  plotButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  graphStyle: {
    marginVertical: 10,
    borderRadius: 8,
  },
  historyContainer: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C6E71',
    marginBottom: 5,
  },
  historyText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
});
