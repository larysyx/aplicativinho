import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

interface IToggle {
    label: string
    options: string[]
    value: string
    onChange: (option: string) => void
}

export default function Toggle({ label, options, value, onChange }: IToggle) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <Button
            color={option === value ? '#FF855F' : '#E9E2EF'}
            onPress={() => onChange(option)}
            title={option}
            key={option}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingBottom: 12,
  },
  label: {
    fontSize: 14,
    padding: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})