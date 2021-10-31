import React, { useState, useCallback } from "react";
import { GestureResponderEvent, View } from "react-native";
import SwipeDownCP from "../../components/SwipeDownCP";
import { Button, Container, ButtonLabel } from "./styles";

const SwipeDownModal: React.FC = () => {
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleModal = useCallback(() => {
    setToggleModal((prevState) => !prevState);
  }, []);

  const handleCloseModal = useCallback((e: GestureResponderEvent) => {
    if (e.target === e.currentTarget) {
      setToggleModal(false);
    }
  }, []);

  return (
    <Container>
      <Button onPress={handleToggleModal}>
        <ButtonLabel>Call Swipe Modals</ButtonLabel>
      </Button>

      <SwipeDownCP
        visible={toggleModal}
        functionCloseModal={handleToggleModal}
      />
    </Container>
  );
};

export default SwipeDownModal;
