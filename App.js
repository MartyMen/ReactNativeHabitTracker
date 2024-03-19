import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native'; // Import StyleSheet
import { createClient } from '@supabase/supabase-js';
import Config from './config';
import Button from './src/components/Button';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './styles'; // Import styles from styles.js


const URL = Config.PROJECT_URL;
const API_KEY = Config.API_KEY;
const supabase = createClient(URL, API_KEY);

const Checkbox = ({ habit_id, selected, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(habit_id)}>
      <View style={[styles.checkbox, selected && styles.selected]}>
        {selected && <Text style={{ color: 'white' }}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [habits, setHabits] = useState([]);
  const [showTextInput, setShowTextInput] = useState(false);
  const [habitName, setHabitName] = useState('');

  const toggleHabitSelection = (habitId) => {
    setSelectedHabits(prevSelected => {
      if (prevSelected.includes(habitId)) {
        return prevSelected.filter(id => id !== habitId);
      } else {
        return [...prevSelected, habitId];
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: Habit, error } = await supabase.from('Habit').select('*');
      if (error) {
        console.error('Error Fetching the Data', error.message);
      } else {
        setHabits(Habit);
      }
    } catch (error) {
      console.error('Error Fetching Data', error.message);
    }
  };

  const handleCreateHabit = async () => {
    try {
      const { error } = await supabase.from('Habit').insert([{ habit_name: habitName }]);
      if (error) {
        console.error('Error Creating Habit', error.message);
        Alert.alert('Error', 'Failed to create habit. Please try again.');
      } else {
        fetchData();
        Alert.alert('Success', 'Habit created successfully.');
      }
    } catch (error) {
      console.error('Error Creating Habit', error.message);
      Alert.alert('Error', 'Failed to create habit. Please try again.');
    }
    setHabitName('');
    setShowTextInput(false);
  };

  async function deleteHabit(ids) {
    try {
      console.log('Deleting habits with IDs:', ids);
      const { error } = await supabase.from('Habit').delete().in('habit_id', ids);
      if (error) {
        console.error('Error Deleting Habits', error.message);
        Alert.alert('Error', 'Failed to delete habits, please try again.');
      } else {
        console.log('Habits deleted successfully');
        fetchData();
        setSelectedHabits([]);
      }
    } catch (error) {
      console.error('Error Deleting Habits', error.message);
      Alert.alert('Error', 'Failed to delete habits, please try again.');
    }
  }

  async function logHabit() {
    try {
      const timestamp = new Date(
        selectedYearIndex,
        selectedMonthIndex,
        selectedDayIndex,
      ).toISOString();

      const newRecords = selectedHabits.map(habitId => ({
        habit_id: habitId,
        record_date: timestamp
      }));

      const { data: insertedRecords, error: insertError } = await supabase.from('HabitRecords').insert(newRecords);
      if (insertError) {
        console.error('Error Logging Habits', insertError.message);
        Alert.alert('Error', 'Failed to log habits, please try again.');
        return;
      }

      console.log('Habits logged successfully:', insertedRecords);
      Alert.alert('Success', 'Habits logged successfully.');
    } catch (error) {
      console.error('Error Logging Habits', error.message);
      Alert.alert('Error', 'Failed to log habits, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {habits.map(habit => (
        <View key={habit.habit_id} style={styles.habitContainer}>
          <Checkbox
            habit_id={habit.habit_id}
            selected={selectedHabits.includes(habit.habit_id)}
            onSelect={toggleHabitSelection}
          />
          <Text style={styles.habitText}>{habit.habit_name}</Text>
        </View>
      ))}

      <Button title="Create Habit" onPress={() => setShowTextInput(true)} />
      <Button title="Log Habits" onPress={logHabit} />
      <Button title="Delete Habits" onPress={() => deleteHabit(selectedHabits)} />

      <Modal visible={showTextInput} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            value={habitName}
            onChangeText={text => setHabitName(text)}
            placeholder="Enter habit name"
          />
          <Button title="Create Habit" onPress={handleCreateHabit} />
          <Button title="Cancel" onPress={() => setShowTextInput(false)} />
        </View>
      </Modal>

      <View style={styles.segmentedControlContainer}>
        <Text>Day:</Text>
        <TextInput
          style={styles.input}
          value={String(selectedDayIndex)}
          onChangeText={text => setSelectedDayIndex(parseInt(text))}
          keyboardType="numeric"
        />
        <Text>Month:</Text>
        <TextInput
          style={styles.input}
          value={String(selectedMonthIndex)}
          onChangeText={text => setSelectedMonthIndex(parseInt(text))}
          keyboardType="numeric"
        />
        <Text>Year:</Text>
        <TextInput
          style={styles.input}
          value={String(selectedYearIndex)}
          onChangeText={text => setSelectedYearIndex(parseInt(text))}
          keyboardType="numeric"
        />
      </View>

      {/* Button to navigate to the CalendarScreen */}
      <Button title="Go to Calendar" onPress={() => navigation.navigate('Calendar')} />
    </View>
  );
};

const CalendarScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Calendar Screen</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
