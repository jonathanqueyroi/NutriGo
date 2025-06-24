// components/styled.ts
import { styled } from 'nativewind';
import {
    Image as RNImage,
    ScrollView as RNScrollView,
    Text as RNText,
    TouchableOpacity as RNTouchableOpacity,
    View as RNView
} from 'react-native';

export const View = styled(RNView);
export const Text = styled(RNText);
export const ScrollView = styled(RNScrollView);
export const Image = styled(RNImage);
export const TouchableOpacity = styled(RNTouchableOpacity);
