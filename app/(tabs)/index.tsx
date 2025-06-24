import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Home() {
  const caloriesAnimation = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  
  const calories = 845;
  const targetCalories = 2000;
  const caloriesPercentage = (calories / targetCalories) * 100;

  useEffect(() => {
    // Animation d'entrée
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Animation des calories
    Animated.timing(caloriesAnimation, {
      toValue: calories,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const macros = [
    { name: 'Protéines', value: '54g', color: '#FF6B6B', icon: '🧬' },
    { name: 'Glucides', value: '120g', color: '#4ECDC4', icon: '🥖' },
    { name: 'Lipides', value: '35g', color: '#FFE66D', icon: '🧈' }
  ];

  const workoutPlan = [
    { day: 'L', type: 'Push', status: 'completed' },
    { day: 'M', type: 'Pull', status: 'completed' },
    { day: 'M', type: 'Legs', status: 'today' },
    { day: 'J', type: 'Cardio', status: 'upcoming' },
    { day: 'V', type: 'Push', status: 'upcoming' },
    { day: 'S', type: 'Pull', status: 'upcoming' },
    { day: 'D', type: 'Repos', status: 'upcoming' }
  ];

  return (
    <LinearGradient
      colors={['#E6F7F1', '#F8FFFE', '#FFFFFF']}
      className="flex-1"
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar style="dark" />

      {/* Header avec profil */}
      <View className="flex-row justify-between items-center px-6 pt-16 pb-4 bg-white/80 backdrop-blur-sm">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-mint-primary rounded-full items-center justify-center mr-3">
            <Ionicons name="person" size={24} color="white" />
          </View>
          <View>
            <Text className="text-xl font-bold text-gray-800">Salut Jonathan !</Text>
            <Text className="text-gray-600 text-sm">Prêt à performer ?</Text>
          </View>
        </View>
        <View className="items-center">
          <Text className="text-xs text-gray-500">Streak</Text>
          <Text className="text-lg font-bold text-mint-primary">7🔥</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 20, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeIn }}>
          {/* Tracker de calories premium */}
          <LinearGradient
            colors={['#40916C', '#52B788', '#74C69D']}
            className="rounded-3xl p-6 mb-6 shadow-lg"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <Ionicons name="flame" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  Calories Today
                </Text>
              </View>
              <View className="items-end">
                <Animated.Text className="text-white text-2xl font-bold">
                  {caloriesAnimation.interpolate({
                    inputRange: [0, calories],
                    outputRange: ['0', calories.toString()],
                    extrapolate: 'clamp',
                  })}
                </Animated.Text>
                <Text className="text-white/80 text-sm">/ {targetCalories} kcal</Text>
              </View>
            </View>

            {/* Barre de progression */}
            <View className="bg-white/20 rounded-full h-3 mb-4">
              <Animated.View 
                className="bg-white rounded-full h-3"
                style={{
                  width: caloriesAnimation.interpolate({
                    inputRange: [0, targetCalories],
                    outputRange: ['0%', `${caloriesPercentage}%`],
                    extrapolate: 'clamp',
                  })
                }}
              />
            </View>

            {/* Macros */}
            <View className="flex-row justify-between">
              {macros.map((macro, index) => (
                <View key={index} className="items-center flex-1">
                  <Text className="text-2xl mb-1">{macro.icon}</Text>
                  <Text className="text-white/90 text-xs">{macro.name}</Text>
                  <Text className="text-white font-bold">{macro.value}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Planning workout */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <Ionicons name="barbell" size={24} color="#40916C" />
                <Text className="text-gray-800 font-bold text-lg ml-2">
                  Planning Workout
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="arrow-forward" size={20} color="#40916C" />
              </TouchableOpacity>
            </View>
            
            <View className="flex-row justify-between mb-4">
              {workoutPlan.map((day, index) => (
                <View key={index} className="items-center">
                  <View className={`w-10 h-10 rounded-full items-center justify-center mb-2 ${
                    day.status === 'completed' ? 'bg-mint-secondary' :
                    day.status === 'today' ? 'bg-mint-primary' :
                    'bg-gray-200'
                  }`}>
                    <Text className={`text-sm font-bold ${
                      day.status === 'completed' || day.status === 'today' ? 'text-white' : 'text-gray-500'
                    }`}>
                      {day.day}
                    </Text>
                  </View>
                  <Text className={`text-xs ${
                    day.status === 'today' ? 'text-mint-primary font-bold' : 'text-gray-500'
                  }`}>
                    {day.type}
                  </Text>
                </View>
              ))}
            </View>
            
            <View className="bg-mint-secondary/20 rounded-2xl p-4">
              <Text className="text-mint-accent font-semibold mb-1">
                Aujourd'hui : Legs 🏋️‍♂️
              </Text>
              <Text className="text-mint-primary text-sm">
                45 min • Niveau intermédiaire
              </Text>
            </View>
          </View>

          {/* Recette du jour premium */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <Ionicons name="restaurant" size={24} color="#40916C" />
                <Text className="text-gray-800 font-bold text-lg ml-2">
                  Recette du Jour
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text className="text-gray-600 text-sm ml-1">4.8</Text>
              </View>
            </View>
            
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" }}
              className="w-full h-48 rounded-2xl mb-4"
              resizeMode="cover"
            />
            
            <Text className="text-gray-800 font-semibold text-lg mb-2">
              Buddha Bowl Protéiné 🥗
            </Text>
            
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center">
                <Ionicons name="flame" size={16} color="#FF6B6B" />
                <Text className="text-gray-600 text-sm ml-1">425 kcal</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="time" size={16} color="#4ECDC4" />
                <Text className="text-gray-600 text-sm ml-1">15 min</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="trending-up" size={16} color="#40916C" />
                <Text className="text-gray-600 text-sm ml-1">Facile</Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="bg-mint-secondary/20 rounded-full px-3 py-1 mr-2">
                <Text className="text-mint-accent text-xs">Végétarien</Text>
              </View>
              <View className="bg-mint-primary/20 rounded-full px-3 py-1">
                <Text className="text-mint-accent text-xs">Prise de masse</Text>
              </View>
            </View>
          </View>

          {/* Actions rapides */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="flex-1 mr-2">
              <LinearGradient
                colors={['#3B82F6', '#1D4ED8']}
                className="rounded-2xl p-6 items-center"
              >
                <Ionicons name="cart" size={32} color="white" />
                <Text className="text-white font-semibold mt-2">Liste de courses</Text>
                <Text className="text-blue-200 text-sm">3 manquants</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 ml-2">
              <LinearGradient
                colors={['#8B5CF6', '#7C3AED']}
                className="rounded-2xl p-6 items-center"
              >
                <Ionicons name="target" size={32} color="white" />
                <Text className="text-white font-semibold mt-2">Mes objectifs</Text>
                <Text className="text-purple-200 text-sm">Voir progrès</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}