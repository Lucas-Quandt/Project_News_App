import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';

// Componente individual de cada Post para facilitar o botão Curtir
function CardPost({ item }) {
  const [curtido, setCurtido] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.title}</Text>
      <Text style={styles.corpo}>{item.body}</Text>

      <TouchableOpacity 
        style={[styles.botaoCurtir, curtido && styles.botaoCurtido]} 
        onPress={() => setCurtido(!curtido)}
      >
        <Text style={styles.textoBotao}>
          {curtido ? '❤️ Curtido' : '🤍 Curtir'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  // 1. Estados exigidos no exercício
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 2. Função para buscar os posts da API
  const buscarPosts = async () => {
    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
      const dados = await resposta.json();
      setPosts(dados);
    } catch (erro) {
      alert('Erro ao carregar as publicações.');
    } finally {
      setCarregando(false);
    }
  };

  // Executa a busca assim que a tela abre
  useEffect(() => {
    buscarPosts();
  }, []);

  return (
    <View style={styles.containerPrincipal}>
      <Text style={styles.header}>📰 Feed de Publicações</Text>

      {/* Indicador de carregamento ou lista */}
      {carregando ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />
      ) : (
        // 3. ScrollView com .map()
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerScroll}
        >
          {posts.map((item) => (
            <CardPost key={item.id} item={item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 15,
  },
  containerScroll: {
    paddingBottom: 25,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  corpo: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
    marginBottom: 12,
  },
  botaoCurtir: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f2f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  botaoCurtido: {
    backgroundColor: '#ffeaa7',
  },
  textoBotao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d3436',
  },
});