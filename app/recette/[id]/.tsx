import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import api from '../../../lib/api';

export default function RecetteDetail() {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (!id) {
      console.error('No ID provided');
      return;
    }

    console.log('Fetching recipe with ID:', id);
    api
      .get(`/recipes/${id}`)
      .then((res) => {
        console.log('Full API Response:', res);
        console.log('Recipe Data:', res.data);
        setRecipe(res.data);
      })
      .catch((err) => console.error('Erreur API:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#40916C" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-700">Recette introuvable.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* IMAGE */}
      <View className="relative">
        <Image
          source={{
            uri: recipe.image || 'https://via.placeholder.com/400x300?text=Recette',
          }}
          className="w-full h-64"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-4 bg-white p-2 rounded-full shadow"
        >
          <Ionicons name="arrow-back" size={20} color="#40916C" />
        </TouchableOpacity>
      </View>

      {/* CONTENU */}
      <View className="bg-white rounded-t-3xl -mt-6 px-6 py-8">
        <Text className="text-3xl font-bold text-mint-accent mb-2">
          {recipe.name || recipe.title}
        </Text>
        <Text className="text-gray-500 mb-4">
          {recipe.description || 'Aucune description disponible.'}
        </Text>

        {/* Infos principales */}
        <View className="flex-row justify-between mb-4">
          <View className="flex-row items-center">
            <Ionicons name="flame" size={18} color="#FF6B6B" />
            <Text className="ml-2 text-gray-700">
              {recipe.nutrition?.calories || recipe.calories} kcal
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time" size={18} color="#4ECDC4" />
            <Text className="ml-2 text-gray-700">{recipe.duration || 'N/A'} min</Text>
          </View>
        </View>

        {/* Valeurs nutritionnelles */}
        {recipe.nutrition && (
          <View className="mb-4">
            <Text className="font-semibold text-lg text-gray-800 mb-2">
              Valeurs nutritionnelles
            </Text>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">
                Protéines: {recipe.nutrition.proteines || recipe.nutrition.proteins || 0}g
              </Text>
              <Text className="text-gray-600">
                Glucides: {recipe.nutrition.glucides || recipe.nutrition.carbs || 0}g
              </Text>
              <Text className="text-gray-600">
                Lipides: {recipe.nutrition.lipides || recipe.nutrition.fats || 0}g
              </Text>
            </View>
          </View>
        )}

        {/* Ingrédients */}
        <Text className="font-semibold text-lg text-gray-800 mb-2">Ingrédients</Text>
        {recipe.ingredients &&
          Array.isArray(recipe.ingredients) &&
          recipe.ingredients.map((ing: any, idx: number) => (
            <View key={idx} className="flex-row items-start mb-1">
              <Text className="text-mint-primary font-bold mr-2">•</Text>
              <Text className="text-gray-600">
                {typeof ing === 'string' ? ing : `${ing.nom} - ${ing.quantite}`}
              </Text>
            </View>
          ))}

        {/* Préparation */}
        {recipe.instructions && (
          <>
            <Text className="font-semibold text-lg text-gray-800 mt-6 mb-2">Préparation</Text>
            <Text className="text-gray-600 leading-relaxed">{recipe.instructions}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}
