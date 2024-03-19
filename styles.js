import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    habitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    habitText: {
        fontSize: 20,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3, // Add border radius for a rounded appearance
        justifyContent: 'center', // Align the checkmark in the center vertically
        alignItems: 'center', // Align the checkmark in the center horizontally
    },
    segmentedControlContainer: {
        width: '80%',
        marginVertical: 10,
    },
    loggedHabitsContainer: {
        marginTop: 20,
    },

    selected: {
        backgroundColor: 'blue',
    }
});

export default styles;