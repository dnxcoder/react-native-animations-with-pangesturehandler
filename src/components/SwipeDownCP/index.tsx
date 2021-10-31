import React, { useEffect, useCallback, useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import { BarDragModal, DarkScreen, TabModal, TextLabel } from "./styled";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

type ContextType = {
  translateY: number;
};

const { height } = Dimensions.get("screen");

interface ISwipeDownModal {
  visible: boolean;
  functionCloseModal: () => void;
}

const SwipeDownCP: React.FC<ISwipeDownModal> = ({
  visible,
  functionCloseModal,
}) => {
  const screenHeight = Dimensions.get("screen").height;

  const DarkScreenAnimatedProps = useSharedValue(screenHeight);
  const DarkScreenOpacity = useSharedValue(0);
  const ModalContent = useSharedValue(screenHeight * 0.3);

  const [states, setStates] = useState(false);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateY = ModalContent.value;
    },
    onActive: (event, context) => {
      //console.log(event.translationY + context.translateY);
      if (event.translationY + context.translateY > 50)
        ModalContent.value = withSpring(
          event.translationY + context.translateY
        );

      console.log(event.velocityY);
    },
    onEnd: (event, context) => {
      if (
        event.velocityY > 400 &&
        event.translationY + context.translateY > 80
      ) {
        ModalContent.value = withTiming(screenHeight * 0.3, {}, () => {
          DarkScreenOpacity.value = withTiming(0, {}, () => {
            DarkScreenAnimatedProps.value = withTiming(screenHeight);
          });
        });
        ("worklet");
        runOnJS(functionCloseModal)();
      } else {
        ModalContent.value = withSpring(50);
      }
    },
  });

  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  const darkScreenAnymatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: DarkScreenAnimatedProps.value }],
    };
  }, []);

  const animateOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: DarkScreenOpacity.value,
    };
  });

  const animateModalContentStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: ModalContent.value }],
    };
  });

  const openModal = useCallback(() => {
    DarkScreenAnimatedProps.value = withTiming(0, {}, () => {
      DarkScreenOpacity.value = withTiming(0.5, { duration: 300 }, () => {
        ModalContent.value = withSpring(50);
      });
    });
  }, [DarkScreenAnimatedProps, DarkScreenOpacity, ModalContent]);

  const closeModal = useCallback(() => {
    ModalContent.value = withTiming(
      Dimensions.get("screen").height * 0.3,
      {},
      () => {
        DarkScreenOpacity.value = withTiming(0, {}, () => {
          DarkScreenAnimatedProps.value = screenHeight;
        });
      }
    );
  }, [ModalContent, DarkScreenOpacity]);

  return (
    <>
      <DarkScreen style={darkScreenAnymatedStyle}>
        <Animated.View
          style={[{ flex: 1, backgroundColor: "#000" }, animateOpacityStyle]}
        >
          <TouchableOpacity
            onPress={functionCloseModal}
            style={{ flex: 1 }}
          ></TouchableOpacity>
        </Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <TabModal style={animateModalContentStyle}>
            <BarDragModal />
            <TextLabel>Testing modal</TextLabel>
          </TabModal>
        </PanGestureHandler>
      </DarkScreen>
    </>
  );
};

export default SwipeDownCP;
