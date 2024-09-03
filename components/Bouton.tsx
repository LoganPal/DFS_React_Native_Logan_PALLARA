import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BoutonProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  text?: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  iconSize?: number;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  style?: object;
}

const Bouton = ({
  iconName,
  text,
  onPress,
  backgroundColor = '#1abc9c',
  textColor = '#ffffff',
  iconColor = '#ffffff',
  iconSize = 24,
  borderRadius = 10,
  paddingVertical = 12,
  paddingHorizontal = 20,
  style = {},
}: BoutonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
        },
        style,
      ]}
      onPress={onPress}
    >
      {iconName && <Ionicons name={iconName} size={iconSize} color={iconColor} style={styles.icon} />}
      {text && <Text style={[styles.text, { color: textColor }]}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default Bouton;
