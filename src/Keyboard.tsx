import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  onMove: () => void;
};

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, onMove }) => {
  const keys = [
    { label: '♔', value: 'K' },
    { label: '♕', value: 'Q' },
    { label: '♖', value: 'R' },
    { label: '♗', value: 'B' },
    { label: '♘', value: 'N' },
    { label: '♙', value: 'P' },
    { label: '0-0', value: '0-0' },
    { label: '0-0-0', value: '0-0-0' },
    { label: '+', value: '+' },
    { label: '=', value: '=' },
    { label: 'a', value: 'a' },
    { label: 'b', value: 'b' },
    { label: 'c', value: 'c' },
    { label: 'd', value: 'd' },
    { label: 'e', value: 'e' },
    { label: 'f', value: 'f' },
    { label: 'g', value: 'g' },
    { label: 'h', value: 'h' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
  ];

  const handleKeyPress = (key: string) => {
    if (key != 'Delete') {
      const letter = getLetterFromEmoji(key);
      onKeyPress(letter);
    } else {
      onKeyPress(key);
    }
  };

  const getLetterFromEmoji = (emoji: string): string => {
    const key = keys.find((item) => item.label === emoji);
    return key ? key.value : '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.keyboard}>
        {keys.map((key, index) => (
          <TouchableOpacity key={index} style={styles.key} onPress={() => handleKeyPress(key.label)}>
            <Text style={styles.keyText}>{key.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.deleteKey} onPress={() => handleKeyPress('Delete')}>
          <Text style={styles.deleteKeyText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.moveButton} onPress={onMove}>
        <Text style={styles.moveButtonText}>Make Move</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  key: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    margin: 5,
    borderRadius: 5,
  },
  keyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteKey: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    margin: 5,
    borderRadius: 5,
  },
  deleteKeyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  moveButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  moveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Keyboard;
