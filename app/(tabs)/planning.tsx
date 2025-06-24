import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Planning() {
  const [selectedDay, setSelectedDay] = useState('Lundi');
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const fullDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const workoutPlan = {
    'Lundi': {
      title: 'Haut du Corps - Push',
      focus: 'Pectoraux, Épaules, Triceps',
      duration: '45-60 min',
      exercises: [
        { name: 'Développé couché', sets: '4x8-10', weight: '80kg', rest: '2-3min' },
        { name: 'Développé incliné', sets: '3x10-12', weight: '60kg', rest: '2min' },
        { name: 'Développé épaules', sets: '4x8-10', weight: '40kg', rest: '2min' },
        { name: 'Élévations latérales', sets: '3x12-15', weight: '12kg', rest: '1min' },
        { name: 'Dips', sets: '3x10-12', weight: 'Poids du corps', rest: '2min' },
        { name: 'Extension triceps', sets: '3x12-15', weight: '25kg', rest: '1min' }
      ]
    },
    'Mardi': {
      title: 'Cardio & Mobilité',
      focus: 'Endurance, Récupération',
      duration: '30-45 min',
      exercises: [
        { name: 'Course à pied', sets: '20-30min', weight: '', rest: '' },
        { name: 'Étirements dynamiques', sets: '10min', weight: '', rest: '' },
        { name: 'Yoga flow', sets: '15min', weight: '', rest: '' }
      ]
    },
    'Mercredi': {
      title: 'Haut du Corps - Pull',
      focus: 'Dos, Biceps',
      duration: '45-60 min',
      exercises: [
        { name: 'Tractions', sets: '4x6-8', weight: 'Poids du corps', rest: '2-3min' },
        { name: 'Rowing barre', sets: '4x8-10', weight: '70kg', rest: '2min' },
        { name: 'Tirage vertical', sets: '3x10-12', weight: '55kg', rest: '2min' },
        { name: 'Rowing haltères', sets: '3x10-12', weight: '25kg', rest: '1min' },
        { name: 'Curl biceps', sets: '3x12-15', weight: '15kg', rest: '1min' },
        { name: 'Curl marteau', sets: '3x10-12', weight: '12kg', rest: '1min' }
      ]
    },
    'Jeudi': {
      title: 'Repos Actif',
      focus: 'Récupération, Mobilité',
      duration: '20-30 min',
      exercises: [
        { name: 'Marche légère', sets: '20min', weight: '', rest: '' },
        { name: 'Étirements', sets: '10min', weight: '', rest: '' }
      ]
    },
    'Vendredi': {
      title: 'Jambes & Fessiers',
      focus: 'Quadriceps, Ischio, Fessiers',
      duration: '50-70 min',
      exercises: [
        { name: 'Squat', sets: '4x8-10', weight: '100kg', rest: '3min' },
        { name: 'Soulevé de terre', sets: '4x6-8', weight: '120kg', rest: '3min' },
        { name: 'Fentes', sets: '3x10-12', weight: '20kg', rest: '2min' },
        { name: 'Hip thrust', sets: '3x12-15', weight: '80kg', rest: '2min' },
        { name: 'Extension mollets', sets: '4x15-20', weight: '60kg', rest: '1min' }
      ]
    },
    'Samedi': {
      title: 'Cardio HIIT',
      focus: 'Brûlage de graisses',
      duration: '25-35 min',
      exercises: [
        { name: 'Burpees', sets: '30s ON / 30s OFF', weight: '', rest: '8 rounds' },
        { name: 'Mountain climbers', sets: '30s ON / 30s OFF', weight: '', rest: '8 rounds' },
        { name: 'Jumping jacks', sets: '30s ON / 30s OFF', weight: '', rest: '8 rounds' }
      ]
    },
    'Dimanche': {
      title: 'Repos Complet',
      focus: 'Récupération totale',
      duration: '',
      exercises: []
    }
  };

  const currentWorkout = workoutPlan[selectedDay];

  const toggleExerciseCompletion = (exerciseName: string) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseName) 
        ? prev.filter(name => name !== exerciseName)
        : [...prev, exerciseName]
    );
  };

  const getCompletionPercentage = () => {
    if (currentWorkout.exercises.length === 0) return 0;
    return Math.round((completedExercises.length / currentWorkout.exercises.length) * 100);
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
        <Text className="text-3xl font-bold text-gray-800 mb-2">Mon Planning</Text>
        <Text className="text-gray-600">Reste concentré sur tes objectifs 💪</Text>
      </View>

      {/* Stats du jour */}
      <View className="px-6 mb-6">
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-2xl font-bold text-mint-primary">{getCompletionPercentage()}%</Text>
              <Text className="text-gray-600">Progression du jour</Text>
            </View>
            <View className="bg-mint-secondary/20 rounded-full p-3">
              <Ionicons name="fitness" size={24} color="#40916C" />
            </View>
          </View>
          
          <View className="bg-gray-200 rounded-full h-3 mb-2">
            <View 
              className="bg-mint-primary rounded-full h-3" 
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </View>
          
          <Text className="text-sm text-gray-600 text-center">
            {completedExercises.length} / {currentWorkout.exercises.length} exercices terminés
          </Text>
        </View>
      </View>

      {/* Sélecteur de jour */}
      <View className="px-6 mb-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
        >
          {fullDays.map((day, index) => (
            <TouchableOpacity
              key={day}
              onPress={() => {
                setSelectedDay(day);
                setCompletedExercises([]);
              }}
              className={`px-4 py-3 rounded-2xl mr-3 min-w-[80px] items-center ${
                selectedDay === day
                  ? 'bg-mint-primary'
                  : 'bg-white border border-gray-300'
              }`}
            >
              <Text
                className={`text-xs font-medium mb-1 ${
                  selectedDay === day ? 'text-white' : 'text-gray-600'
                }`}
              >
                {days[index]}
              </Text>
              <Text
                className={`text-lg font-bold ${
                  selectedDay === day ? 'text-white' : 'text-gray-800'
                }`}
              >
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Contenu principal */}
      <ScrollView 
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Info séance */}
        <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4">
            <View className="bg-mint-secondary/20 rounded-full p-3 mr-4">
              <Ionicons 
                name={currentWorkout.exercises.length === 0 ? "bed" : "barbell"} 
                size={24} 
                color="#40916C" 
              />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-800 mb-1">
                {currentWorkout.title}
              </Text>
              <Text className="text-gray-600">{currentWorkout.focus}</Text>
            </View>
          </View>
          
          {currentWorkout.duration && (
            <View className="flex-row items-center">
              <Ionicons name="time" size={16} color="#4ECDC4" />
              <Text className="text-gray-600 ml-2">Durée: {currentWorkout.duration}</Text>
            </View>
          )}
        </View>

        {/* Liste des exercices */}
        {currentWorkout.exercises.length > 0 ? (
          currentWorkout.exercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleExerciseCompletion(exercise.name)}
              className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border ${
                completedExercises.includes(exercise.name)
                  ? 'border-mint-primary bg-mint-secondary/5'
                  : 'border-gray-100'
              }`}
            >
              <View className="flex-row items-center">
                <View className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
                  completedExercises.includes(exercise.name)
                    ? 'bg-mint-primary border-mint-primary'
                    : 'border-gray-300'
                }`}>
                  {completedExercises.includes(exercise.name) && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                
                <View className="flex-1">
                  <Text className={`font-semibold text-base mb-1 ${
                    completedExercises.includes(exercise.name)
                      ? 'text-mint-primary line-through'
                      : 'text-gray-800'
                  }`}>
                    {exercise.name}
                  </Text>
                  
                  <View className="flex-row flex-wrap">
                    <View className="flex-row items-center mr-4 mb-1">
                      <Ionicons name="repeat" size={14} color="#666" />
                      <Text className="text-gray-600 text-sm ml-1">{exercise.sets}</Text>
                    </View>
                    
                    {exercise.weight && (
                      <View className="flex-row items-center mr-4 mb-1">
                        <Ionicons name="barbell" size={14} color="#666" />
                        <Text className="text-gray-600 text-sm ml-1">{exercise.weight}</Text>
                      </View>
                    )}
                    
                    {exercise.rest && (
                      <View className="flex-row items-center mb-1">
                        <Ionicons name="time" size={14} color="#666" />
                        <Text className="text-gray-600 text-sm ml-1">{exercise.rest}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="bg-white rounded-3xl p-8 items-center">
            <View className="bg-mint-secondary/20 rounded-full p-6 mb-4">
              <Ionicons name="bed" size={32} color="#40916C" />
            </View>
            <Text className="text-xl font-bold text-gray-800 mb-2">Jour de repos</Text>
            <Text className="text-gray-600 text-center">
              Profite de cette journée pour récupérer et recharger tes batteries 🌟
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}