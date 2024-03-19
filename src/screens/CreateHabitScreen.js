import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import Button from '../components/Button';

const CreateHabitScreen = ({ onSubmit }) => {
    const [habitName, setHabitName] = useState('');

    const handleSubmit = () => {
        if (habitName.trim() === '') {
            Alert.alert('Error', 'Please enter a habit name.');
            return;
        }
        onSubmit(habitName.trim());
        setHabitName('');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                value={habitName}
                onChangeText={setHabitName}
                placeholder="Enter habit name"
                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
            />
            <Button onPress={handleSubmit} title="Create Habit" />
        </View>
    );
};

export default CreateHabitScreen;
