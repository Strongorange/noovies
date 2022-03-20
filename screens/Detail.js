import React, { useEffect } from "react";
import { Dimensions, Text, StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR, DARK_GREY } from "../colors";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window"); //Dimensions 를 이용해서 화면의 크기를 알 수 있음

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 10px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 30px;
  align-self: flex-end;
  width: 80%;
  margin-left: 15px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0px 20px;
  font-size: 20px;
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const isDark = useColorScheme() === "dark";
  const { isLoading: moviesLoading, data: moviesData } = useQuery(
    ["movies", params.id],
    moviesApi.detail,
    { enabled: "original_title" in params }
  );
  const { isLoading: tvLoading, data: tvData } = useQuery(
    ["tv", params.id],
    tvApi.detail,
    {
      enabled: "original_name" in params,
    }
  );

  console.log("movies", moviesData);
  console.log("tv", tvData);
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", isDark ? BLACK_COLOR : DARK_GREY]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{params.title}</Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
};

export default Detail;
