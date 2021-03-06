import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image`
  width: 100px;
  height: 130px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({ path }) => <Image source={{ uri: makeImgPath(path) }} />;

export default Poster;
