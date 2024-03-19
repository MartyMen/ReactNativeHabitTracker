import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Example icon library, you can use any icon library or custom icon

const CustomCheckbox = ({ checked, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked && <Ionicons name="checkmark" size={24} color="white" />} {/* Example checkmark icon */}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: 'blue', // Example color for checked state
    },
});

export default CustomCheckbox;
