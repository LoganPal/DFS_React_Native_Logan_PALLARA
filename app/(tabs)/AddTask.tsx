import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Bouton from '../../components/Bouton';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

interface Tache {
  id: string;
  text: string;
}

type RootTabParamList = {
  ListeTaches: undefined;
  AjouterTache: undefined;
};

type AjouterTacheScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'AjouterTache'>;

const AddTask: React.FC = () => {
  const [text, setText] = useState('');
  const navigation = useNavigation<AjouterTacheScreenNavigationProp>();

  const ajouterTache = async () => {
    if (text.trim().length === 0) {
      Alert.alert('Erreur', 'Veuillez entrer une tâche valide.');
      return;
    }

    const storedTaches = await AsyncStorage.getItem('taches');
    const taches: Tache[] = storedTaches ? JSON.parse(storedTaches) : [];

    const newTaches = [...taches, { id: Date.now().toString(), text }];

    await AsyncStorage.setItem('taches', JSON.stringify(newTaches));
    setText(''); // Clear the input field after adding the task
    navigation.navigate('ListeTaches');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Ajouter une nouvelle tâche</Text>
      <TextInput
        placeholder="Qu'avez-vous à faire ?"
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <Bouton
        text="Créer la tâche"
        onPress={ajouterTache}
        backgroundColor="#ff6347"
        textColor="#ffffff"
        iconName="ios-add-circle-outline"
        iconColor="#ffffff"
        iconSize={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#2c3e50',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#34495e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#ecf0f1',
    fontSize: 18,
    color: '#2c3e50',
  },
});

export default AddTask;
