import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../colors';

export default function HelpersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Volunteer');

  const dropdownItems = ['Item 1', 'Item 2', 'Item 3'];

  // Toggles showing/hiding the dropdown list
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemPress = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Header */}
      <TouchableOpacity style={styles.headerContainer} onPress={toggleDropdown}>
        <Text style={styles.headerText}>{selectedItem}</Text>
        {/* Conditionally show an up or down arrow */}
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Dropdown body (only rendered if isOpen == true) */}
      {isOpen && (
        <View style={styles.dropdownContainer}>
          {dropdownItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleItemPress(item)}
              style={styles.dropdownItem}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 4,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    marginLeft: 8,
    fontSize: 18,
    color: '#333',
  },
  dropdownContainer: {
    width: 200,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 4,
    marginTop: 2,
  },
  dropdownItem: {
    padding: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});