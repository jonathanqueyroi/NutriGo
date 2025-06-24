import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, 
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#40916C',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
          elevation: 0,
          shadowOpacity: 0.1,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: -5 },
          shadowColor: '#000000',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recettes"
        options={{
          title: 'Recettes',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "restaurant" : "restaurant-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ingredients"
        options={{
          title: 'Ingrédients',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "leaf" : "leaf-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: 'Planning',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "barbell" : "barbell-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}