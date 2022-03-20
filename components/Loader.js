import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { YELLOW_COLOR } from "../colors";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = () => (
  <Wrapper>
    <ActivityIndicator size="large" color={YELLOW_COLOR} />
  </Wrapper>
);

export default Loader;
