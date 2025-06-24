import { Pressable, Text } from 'react-native';

export default function Button({ title, onPress }) {
  return (
    <Pressable 
      className="bg-blue-600 px-4 py-2 rounded-xl mt-4"
      onPress={onPress}
    >
      <Text className="text-white font-semibold text-center">{title}</Text>
    </Pressable>
  );
}
