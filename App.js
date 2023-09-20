import React, { useRef } from 'react';
import styled from 'styled-components';
import {Ionicons} from'@expo/vector-icons';
import { Animated, PanResponder, View } from 'react-native';

const BLACK_COLOR = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
  flex : 1;
  background-color: ${BLACK_COLOR}
`;

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Word = styled.Text`
  font-size: 38px;
  font-weight: 500;
  color: ${props => props.color}
  
`;
const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
  padding: 10px 20px;
  border-radius: 12px;
  background-color: white;
`;

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true
  });

  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true
  })

  const panResponer = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {onPressIn.start()},
    onPanResponderMove: (_, {dx, dy}) => {
      position.setValue({
        x: dx,
        y: dy
      })
    },
    onPanResponderRelease: () => {
      Animated.parallel([onPressOut, goHome]).start();
    }
  })).current;

  return (
    <Container>
      <Edge>
        <WordContainer>
          <Word color={GREEN}>앎!</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard 
          {...panResponer.panHandlers}
          style={{transform: [{scale}, ...position.getTranslateTransform()]}}
        >
          <Ionicons name="beer" color={GREY} size={66} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer>
          <Word color={RED}>몲!</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}
