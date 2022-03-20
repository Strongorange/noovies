import React, { useEffect } from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  useColorScheme,
  Linking,
} from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR, DARK_GREY } from "../colors";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";

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

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;

  font-size: 20px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  font-weight: 600;
  line-height: 24px;
  margin-left: 10px;
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const isDark = useColorScheme() === "dark";
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);

  const openTYLink = async (videoId) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    await Linking.openURL(baseUrl);
  };

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
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openTYLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
