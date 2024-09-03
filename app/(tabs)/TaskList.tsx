import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import des icônes
import { useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Tache {
  id: string;
  text: string;
}

type ListeTacheScreenNavigationProp = NativeStackNavigationProp<Record<string, any>, 'ListeTaches'>;

const TaskList = ({ navigation }: { navigation: ListeTacheScreenNavigationProp }) => {
  const [taches, setTaches] = useState<Tache[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTaches();
    }
  }, [isFocused]);

  const fetchTaches = async () => {
    try {
      const storedTaches = await AsyncStorage.getItem('taches');
      if (storedTaches) {
        setTaches(JSON.parse(storedTaches));
      } else {
        setTaches([]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer les tâches.');
    }
  };

  const terminerTache = async (id: string) => {
    const newTaches = taches.filter(tache => tache.id !== id);
    setTaches(newTaches);
    await AsyncStorage.setItem('taches', JSON.stringify(newTaches));
    Alert.alert('Succès', 'La tâche a été marquée comme terminée.');
  };

  const enregistrerModifications = async (id: string) => {
    await AsyncStorage.setItem('taches', JSON.stringify(taches));
    Alert.alert('Succès', 'Les modifications ont été enregistrées.');
  };

  const modifierTache = (id: string, text: string) => {
    const newTaches = taches.map(tache =>
      tache.id === id ? { ...tache, text } : tache
    );
    setTaches(newTaches);
  };

  const renderItem = ({ item }: { item: Tache }) => (
    <View style={styles.taskContainer}>
      <TextInput
        value={item.text}
        onChangeText={(text) => modifierTache(item.id, text)}
        style={styles.input}
      />
      <TouchableOpacity
        style={[styles.iconButton, { backgroundColor: '#4CAF50' }]} // Vert pour le bouton Sauvegarder
        onPress={() => enregistrerModifications(item.id)}
      >
        <FontAwesome name="save" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, { backgroundColor: '#F44336' }]} // Rouge pour le bouton Terminé
        onPress={() => terminerTache(item.id)}
      >
        <MaterialIcons name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={taches}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: '#FFA500' }]} // Bouton Ajouter en orange
        onPress={() => navigation.navigate('AjouterTache')}
      >
        <FontAwesome name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C2C2C', // Couleur de fond foncée
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#3A3A3A', // Couleur de fond pour chaque tâche, un peu plus claire que le fond général
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#555',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#4A4A4A', // Fond plus clair pour le champ de texte
    color: '#fff', // Texte en blanc pour contraster avec le fond foncé
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    width: 40,
    height: 40,
  },
  addButton: {
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 60,
    height: 60,
    elevation: 5,
  },
});

export default TaskList;
