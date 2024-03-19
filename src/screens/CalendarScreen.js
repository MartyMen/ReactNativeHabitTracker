import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { createClient } from '@supabase/supabase-js';
import Config from './config';
import styles from '../Kaizen/styles.js';

// Initialize Supabase client
const URL = Config.PROJECT_URL;
const API_KEY = Config.API_KEY;
const supabase = createClient(URL, API_KEY);

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [loggedHabits, setLoggedHabits] = useState([]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        if (selectedDate) {
            fetchLoggedHabits(selectedDate);
        }
    }, [selectedDate]);

    const fetchLoggedHabits = async (date) => {
        try {
            const { data, error } = await supabase
                .from('HabitRecords')
                .select('habit_id')
                .eq('record_date', date);

            if (error) {
                console.error('Error fetching logged habits:', error.message);
            } else {
                const habitNames = data.map((record) => record.habit_id);
                setLoggedHabits(habitNames);
            }
        } catch (error) {
            console.error('Error fetching logged habits:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={(day) => handleDateSelect(day.dateString)}
                markedDates={{ [selectedDate]: { selected: true } }}
            />
            <View style={styles.loggedHabitsContainer}>
                {loggedHabits.map((habit, index) => (
                    <Text key={index}>{habit}</Text>
                ))}
            </View>
        </View>
    );
};

export default CalendarScreen;
