import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function History({ navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = JSON.parse(await AsyncStorage.getItem('history')) || [];
        setHistory(storedHistory);
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    };

    loadHistory();
  }, []);

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('history');
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#004d40" />
        </TouchableOpacity>
        <Text style={styles.title}>Calculation History</Text>
        <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
          <Ionicons name="trash-outline" size={24} color="#004d40" />
        </TouchableOpacity>
      </View>

      {/* History List */}
      <ScrollView style={styles.historyContainer}>
        {history.length > 0 ? (
          history.map((entry, index) => (
            <Text key={index} style={styles.historyText}>
              {entry.input} = {entry.result}
            </Text>
          ))
        ) : (
          <Text style={styles.noHistoryText}>No history available</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8e6e7',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
  },
  clearButton: {
    padding: 5,
  },
  historyContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
  },
  historyText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  noHistoryText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
});
