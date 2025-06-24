import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import api from '../../lib/api';


export default function Ingredients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [newCategory, setNewCategory] = useState('Légumes');
  const [ingredients, setIngredients] = useState([]);
  const [newQuantity, setNewQuantity] = useState('1');
  const [newUnit, setNewUnit] = useState('pcs');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [showDateModal, setShowDateModal] = useState(false);

  const categories = ['Tous', 'Légumes', 'Viandes', 'Poissons', 'Laitiers', 'Céréales', 'Protéines', 'Fruits'];
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function getIconForCategory(category) {
    const categoryIcons = {
      'Légumes': '🥬',
      'Viandes': '🍖',
      'Poissons': '🐟',
      'Laitiers': '🥛',
      'Céréales': '🌾',
      'Protéines': '🍳',
      'Fruits': '🍎',
    };
    return categoryIcons[category] || '🍽️';
  }
  
  const refreshIngredients = async () => {
    try {
      const res = await api.get('/ingredients');
      const transformed = res.data
        .map((item) => {
          if (!item._id) return null;
          return {
            id: typeof item._id === 'object' && item._id.$oid
            ? item._id.$oid
            : item._id?.toString(),
            name: item.name ?? 'Ingrédient',
            category: item.category ?? 'Autre',
            quantity: item.quantity ?? '1',
            unit: item.unit ?? 'pcs',
            expiry: item.expiry ?? '3 jours',
            status: item.status ?? 'fresh',
            icon: item.icon ?? getIconForCategory(item.category),
          };
        })
        .filter(Boolean);
  
      setIngredients(transformed);
    } catch (err) {
      console.error('❌ Erreur de rafraîchissement des ingrédients :', err);
    }
  };  

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);


  useEffect(() => {
    refreshIngredients();
  }, []);

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'fresh': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
      case 'expiring': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' };
      case 'expired': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'fresh': return 'checkmark-circle';
      case 'expiring': return 'warning';
      case 'expired': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const addIngredient = async () => {
    if (!newIngredient.trim()) return;
  
    const payload = {
      name: newIngredient,
      category: newCategory,
      quantity: newQuantity,
      unit: newUnit,
      expiry: expiryDate.toISOString().split('T')[0], // format YYYY-MM-DD
      status: 'fresh',
      icon: getIconForCategory(newCategory),
    };
  
    try {
      const res = await api.post('/ingredients', payload);
      console.log('Ingrédient ajouté en BDD :', res.data);
      await refreshIngredients();
  
      // Reset UI
      setNewIngredient('');
      setNewQuantity('1');
      setNewUnit('pcs');
      setExpiryDate(new Date());
      setShowAddModal(false);
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      Alert.alert("Erreur", "Impossible d'ajouter l'ingrédient.");
    }
  };
  

  const removeIngredient = (id) => {
    Alert.alert(
      "Supprimer l'ingrédient",
      "Êtes-vous sûr de vouloir supprimer cet ingrédient ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer", style: "destructive", onPress: async () => {
            console.log('🧪 ID envoyé pour suppression :', id);
            try {
              const res = await api.delete(`/ingredients/${id}`);
              if (res.data.success) {
                console.log(`🗑️ Ingrédient supprimé (id: ${id})`);
  
                await refreshIngredients();
              } else {
                Alert.alert("Erreur", "Impossible de supprimer l'ingrédient.");
              }
            } catch (error) {
              console.error('❌ Erreur DELETE :', error);
              Alert.alert("Erreur", "Une erreur est survenue lors de la suppression.");
            }
          }
        }
      ]
    );
  };  

  const renderIngredient = ({ item, index }) => {
    const statusStyle = getStatusColor(item.status);
    const statusIcon = getStatusIcon(item.status);
    
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50 * index, 0],
            })
          }]
        }}
      >
        <View className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border ${statusStyle.border}`}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className={`w-12 h-12 ${statusStyle.bg} rounded-xl items-center justify-center mr-3`}>
                <Text className="text-2xl">{item.icon}</Text>
              </View>
              
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold text-lg">{item.name}</Text>
                <Text className="text-gray-500 text-sm">{item.category}</Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-gray-600 font-medium">{item.quantity} {item.unit}</Text>
                  <View className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
                  <Ionicons name={statusIcon} size={16} color={statusStyle.text.includes('green') ? '#059669' : statusStyle.text.includes('orange') ? '#D97706' : '#DC2626'} />
                  <Text className={`text-sm ml-1 ${statusStyle.text}`}>{item.expiry}</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity
              className="bg-gray-50 rounded-lg px-3 py-2.5 flex-row items-center justify-between border border-gray-200"
              onPress={() => {
                setTempDate(expiryDate); // on prépare la date courante dans le tampon
                setShowDateModal(true);  // on affiche la vraie modal
              }}
            >
              <Text className="text-gray-800 text-sm">
                {expiryDate.toLocaleDateString('fr-FR')}
              </Text>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            </TouchableOpacity>

          </View>
        </View>
      </Animated.View>
    );
  };

  const getStatsData = () => {
    const total = ingredients.length;
    const fresh = ingredients.filter(i => i.status === 'fresh').length;
    const expiring = ingredients.filter(i => i.status === 'expiring').length;
    const expired = ingredients.filter(i => i.status === 'expired').length;
    
    return { total, fresh, expiring, expired };
  };

  const stats = getStatsData();

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
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">Mon Frigo</Text>
            <Text className="text-gray-600">Gérez vos ingrédients intelligemment</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setShowAddModal(true)}
            className="w-12 h-12 bg-mint-primary rounded-full items-center justify-center shadow-lg"
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats rapides */}
        <View className="flex-row justify-between mb-4">
          <View className="bg-white rounded-2xl p-4 flex-1 mr-2 shadow-sm">
            <View className="flex-row items-center">
              <Ionicons name="restaurant" size={20} color="#40916C" />
              <Text className="text-gray-800 font-bold text-lg ml-2">{stats.total}</Text>
            </View>
            <Text className="text-gray-600 text-sm">Total ingrédients</Text>
          </View>
          
          <View className="bg-white rounded-2xl p-4 flex-1 ml-2 shadow-sm">
            <View className="flex-row items-center">
              <Ionicons name="warning" size={20} color="#D97706" />
              <Text className="text-gray-800 font-bold text-lg ml-2">{stats.expiring + stats.expired}</Text>
            </View>
            <Text className="text-gray-600 text-sm">À consommer</Text>
          </View>
        </View>
      </View>

      {/* Barre de recherche */}
      <View className="px-6 mb-4">
        <View className="bg-white rounded-2xl flex-row items-center px-4 py-3 shadow-sm border border-gray-100">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Rechercher un ingrédient..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Filtres par catégorie */}
      <View className="px-6 mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full mr-3 ${
                selectedCategory === category
                  ? 'bg-mint-primary'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <Text className={`text-sm font-medium ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-700'
              }`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Liste des ingrédients */}
      <FlatList
        data={filteredIngredients}
        renderItem={renderIngredient}
        keyExtractor={(item) => (item.id || item._id)?.toString() ?? Math.random().toString()}
        contentContainerStyle={{ padding: 20, paddingTop: 0, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal d'ajout d'ingrédient */}
      <Modal
        isVisible={showAddModal}
        onBackdropPress={() => setShowAddModal(false)}
        onSwipeComplete={() => setShowAddModal(false)}
        swipeDirection="down"
        propagateSwipe={true} // ✅ C'est ça qui manquait
        backdropOpacity={0.4}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="bg-white rounded-t-3xl" style={{ maxHeight: '70%' }}>
            {/* Handle de glissement */}
            <View className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-3" />

            {/* Header ultra compact */}
            <View className="px-4 pb-2">
              <Text className="text-lg font-bold text-gray-800 text-center">
                Ajouter un ingrédient
              </Text>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false} 
              className="px-4"
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              {/* Nom */}
              <View className="mb-3">
                <Text className="text-gray-600 text-xs mb-1 font-medium">NOM</Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-3 py-2.5 text-gray-800 border border-gray-200"
                  placeholder="Ex: Tomates cerises"
                  value={newIngredient}
                  onChangeText={setNewIngredient}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Quantité + Unité en ligne */}
              <View className="mb-3">
                <Text className="text-gray-600 text-xs mb-1 font-medium">QUANTITÉ & UNITÉ</Text>
                <View className="flex-row gap-2">
                  <TextInput
                    className="bg-gray-50 rounded-lg px-3 py-2.5 text-gray-800 border border-gray-200 w-16 text-center"
                    placeholder="1"
                    keyboardType="numeric"
                    value={newQuantity}
                    onChangeText={setNewQuantity}
                    placeholderTextColor="#9CA3AF"
                  />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1">
                    <View className="flex-row gap-1">
                      {['pcs', 'g', 'kg', 'ml', 'L'].map((unit) => (
                        <TouchableOpacity
                          key={unit}
                          onPress={() => setNewUnit(unit)}
                          className={`px-3 py-2.5 rounded-lg ${
                            newUnit === unit ? 'bg-mint-primary' : 'bg-gray-100'
                          }`}
                        >
                          <Text className={`text-xs font-medium ${
                            newUnit === unit ? 'text-white' : 'text-gray-700'
                          }`}>
                            {unit}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>

              {/* Date */}
              <View className="mb-3">
                <Text className="text-gray-600 text-xs mb-1 font-medium">DATE D'EXPIRATION</Text>
                <TouchableOpacity
                  className="bg-gray-50 rounded-lg px-3 py-2.5 flex-row items-center justify-between border border-gray-200"
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text className="text-gray-800 text-sm">
                    {expiryDate.toLocaleDateString('fr-FR')}
                  </Text>
                  <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={expiryDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) setExpiryDate(selectedDate);
                    }}
                  />
                )}
              </View>

              {/* Catégories compactes */}
              <View className="mb-4">
                <Text className="text-gray-600 text-xs mb-1 font-medium">CATÉGORIE</Text>
                <View className="flex-row flex-wrap gap-1">
                  {categories.slice(1).map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setNewCategory(category)}
                      className={`flex-row items-center px-2 py-1.5 rounded-lg ${
                        newCategory === category ? 'bg-mint-primary' : 'bg-gray-100'
                      }`}
                    >
                      <Text className="text-sm mr-1">
                        {getIconForCategory(category)}
                      </Text>
                      <Text className={`text-xs font-medium ${
                        newCategory === category ? 'text-white' : 'text-gray-700'
                      }`}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Footer boutons */}
            <View className="px-4 py-3 border-t border-gray-100">
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-100 rounded-lg py-2.5 items-center"
                >
                  <Text className="text-gray-700 font-medium text-sm">Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={addIngredient}
                  disabled={!newIngredient.trim()}
                  className={`flex-1 rounded-lg py-2.5 items-center ${
                    newIngredient.trim() ? 'bg-mint-primary' : 'bg-gray-300'
                  }`}
                >
                  <Text className={`font-medium text-sm ${
                    newIngredient.trim() ? 'text-white' : 'text-gray-500'
                  }`}>
                    Ajouter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
}