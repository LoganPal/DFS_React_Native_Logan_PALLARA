import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Task {
  id: string;
  text: string;
}

type TaskListScreenNavigationProp = NativeStackNavigationProp<Record<string, any>, 'TaskList'>; // Remplacement de TaskList par TaskListScreen

const TaskListScreen = ({ navigation }: { navigation: TaskListScreenNavigationProp }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
    }
  }, [isFocused]);

  const fetchTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer les tâches.');
    }
  };

  const deleteTask = async (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const updateTask = (id: string, text: string) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, text } : task
    );
    setTasks(newTasks);
  };

  const saveTaskChanges = async (id: string) => {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    Alert.alert('Succès', 'La tâche a été mise à jour.');
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <TextInput
        value={item.text}
        onChangeText={(text) => updateTask(item.id, text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.saveButton} onPress={() => saveTaskChanges(item.id)}>
        <Text style={styles.buttonText}>✔</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
        <Text style={styles.buttonText}>✖</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>+ Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1A1A1A', // Fond plus foncé pour un look moderne
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    padding: 15,
    backgroundColor: '#2B2B2B', // Fond de chaque tâche un peu plus clair que le fond principal
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444', // Bordure discrète
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#3C3C3C', // Fond des champs de texte plus clair
    color: '#EAEAEA', // Texte clair pour contraster avec le fond sombre
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#555', // Bordure pour délimiter le champ de texte
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#4CAF50', // Vert pour le bouton "Sauvegarder"
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#F44336', // Rouge pour le bouton "Terminé"
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFF', // Texte blanc pour les boutons
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#FF9800', // Bouton d'ajout en orange
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskListScreen;