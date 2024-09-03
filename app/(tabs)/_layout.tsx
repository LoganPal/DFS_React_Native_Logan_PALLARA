import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TaskList from '../(tabs)/TaskList';
import AddTask from '../(tabs)/AddTask';

const Tab = createMaterialTopTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ffffff', // Couleur du texte actif en blanc
        tabBarInactiveTintColor: '#9e9e9e', // Couleur du texte inactif en gris clair
        tabBarStyle: {
          backgroundColor: '#000000', // Fond de la barre d'onglets en noir
          height: 50,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 5, // Espacement sous le texte pour le centrer verticalement
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#ffffff', // Indicateur sous l'onglet actif en blanc
          height: 3,
        },
      }}
    >
      <Tab.Screen
        name="ListeTaches"
        component={TaskList}
        options={{
          title: 'Toutes les tâches',
        }}
      />
      <Tab.Screen
        name="AjouterTache"
        component={AddTask}
        options={{
          title: 'Ajouter une tâche',
        }}
      />
    </Tab.Navigator>
  );
}
