import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import api from '../../lib/api';

export default function Recettes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const router = useRouter();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get('/recipes')
      .then(response => {
        const normalized = response.data.map(recipe => ({
          ...recipe,
          id: recipe._id,
          name: recipe.name ?? recipe.title ?? 'Recette sans nom',
          tags: recipe.tags ?? [],
          calories: recipe.calories ?? recipe.nutrition?.calories ?? '???',
          time: recipe.duration ? `${recipe.duration} min` : '???',
          image: recipe.image ?? 'https://source.unsplash.com/random/400x300?healthy-food', // image par défaut
          ingredients: Array.isArray(recipe.ingredients)
            ? (typeof recipe.ingredients[0] === 'string'
                ? recipe.ingredients.length
                : recipe.ingredients.map(i => i.nom).join(''))
            : 0
        }));
        setRecipes(normalized);
      })
      .catch(error => console.error('Erreur API:', error));
  }, []);  

  const filters = ['Tous', 'Végétarien', 'Protéiné', 'Rapide', 'Sain'];
  
  // const recipes = [
  //   {
  //     id: 1,
  //     name: 'Buddha Bowl Protéiné',
  //     calories: '425 kcal',
  //     time: '15 min',
  //     difficulty: 'Facile',
  //     rating: 4.8,
  //     image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  //     tags: ['Végétarien', 'Protéiné'],
  //     ingredients: 12
  //   },
  //   {
  //     id: 2,
  //     name: 'Saumon Grillé & Quinoa',
  //     calories: '580 kcal',
  //     time: '25 min',
  //     difficulty: 'Moyen',
  //     rating: 4.9,
  //     image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
  //     tags: ['Protéiné', 'Omega-3'],
  //     ingredients: 8
  //   },
  //   {
  //     id: 3,
  //     name: 'Smoothie Bowl Énergisant',
  //     calories: '320 kcal',
  //     time: '10 min',
  //     difficulty: 'Facile',
  //     rating: 4.7,
  //     image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
  //     tags: ['Végétarien', 'Rapide'],
  //     ingredients: 6
  //   },
  //   {
  //     id: 4,
  //     name: 'Poulet Tikka Masala',
  //     calories: '650 kcal',
  //     time: '35 min',
  //     difficulty: 'Difficile',
  //     rating: 4.6,
  //     image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
  //     tags: ['Protéiné', 'Épicé'],
  //     ingredients: 15
  //   }
  // ];

  const filteredRecipes = recipes
  .filter(recipe => recipe.name && (recipe.id || recipe._id))
  .filter(recipe => {
    const matchesSearch = recipe.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'Tous' || recipe.tags?.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });


  const renderRecipe = ({ item }) => {
    console.log('Recipe ID:', item.id); // Vous pouvez ajouter des instructions ici
  
    return (
      <TouchableOpacity
        className="bg-white rounded-3xl p-4 mb-4 shadow-sm border border-gray-100"
        onPress={() => {
          console.log('Navigating to recipe with ID:', item.id);
          router.push(`/recette/${item.id.toString()}`);
        }}
      >
        <Image
          source={{ uri: item.image }}
          className="w-full h-48 rounded-2xl mb-4"
          resizeMode="cover"
        />
  
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-gray-800 font-semibold text-lg flex-1 mr-2">
            {item.name}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-gray-600 text-sm ml-1">{item.rating}</Text>
          </View>
        </View>
  
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <Ionicons name="flame" size={16} color="#FF6B6B" />
            <Text className="text-gray-600 text-sm ml-1">{item.calories}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time" size={16} color="#4ECDC4" />
            <Text className="text-gray-600 text-sm ml-1">{item.time}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="restaurant" size={16} color="#40916C" />
            <Text className="text-gray-600 text-sm ml-1">{item.ingredients} ing.</Text>
          </View>
        </View>
  
        <View className="flex-row flex-wrap">
          {(item.tags ?? []).map((tag, index) => (
            <View key={index} className="bg-mint-secondary/20 rounded-full px-3 py-1 mr-2 mb-2">
              <Text className="text-mint-accent text-xs">{tag}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <LinearGradient
      colors={['#E6F7F1', '#F8FFFE', '#FFFFFF']}
      className="flex-1"
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-6 pt-16 pb-4">
        <Text className="text-3xl font-bold text-gray-800 mb-2">Mes Recettes</Text>
        <Text className="text-gray-600">Découvre des plats adaptés à tes objectifs</Text>
      </View>

      {/* Barre de recherche */}
      <View className="px-6 mb-4">
        <View className="bg-white rounded-2xl flex-row items-center px-4 py-3 shadow-sm border border-gray-100">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Rechercher une recette..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Filtres */}
      <View className="px-6 mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
        >
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full mr-3 ${
                selectedFilter === filter
                  ? 'bg-mint-primary'
                  : 'bg-white border border-gray-300'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedFilter === filter ? 'text-white' : 'text-gray-700'
                }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Liste des recettes */}
      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => (item.id ?? item._id)?.toString()}
        contentContainerStyle={{ padding: 20, paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}