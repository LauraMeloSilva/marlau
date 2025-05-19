import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Tipagem do usuário
interface User {
  id: number;
  name: string;
  email: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Requisição à API
  useEffect(() => {
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Erro ao buscar dados:', error));
  }, []);

  // Renderização de cada item
  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffc0cb', // fundo rosa
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d6336c', // rosa escuro
  },
  email: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default App;
