import styled from "styled-components/native";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";

export const DarkScreen = styled(Animated.View)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
`;

export const TabModal = styled(Animated.View)`
  padding: 10px 30px 30px 20px;
  background-color: rgb(226, 120, 0);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding-top: 20px;
  align-items: center;
  height: ${Dimensions.get('screen').height * 0.3}px;
`;

export const TextLabel = styled.Text`

font-size: 18px;
color: #FFF;
text-align: center;
`;

export const BarDragModal = styled.View`

width: 30px;
height: 5px;
background-color: #DDD;
margin-bottom: 10px;

`;
