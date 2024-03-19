import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleCreateHabitPress = () => {
        navigation.navigate('CreateHabit');
    };

    return (
        <View>
            <Button title="Create Habit" onPress={handleCreateHabitPress} />
        </View>
    );
};

export default HomeScreen;
