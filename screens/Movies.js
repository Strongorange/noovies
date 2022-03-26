import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList } from "react-native";

import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

// <STYLED COMPONENT><STYLED COMPONENT><STYLED COMPONENT><STYLED COMPONENT><STYLED COMPONENT>
// <STYLED COMPONENT><STYLED COMPONENT><STYLED COMPONENT><STYLED COMPONENT><STYLED COMPONENT>
// <STYLED COMPONENT><STYLED COMPONENT><STYLED COMPONENT><STYLED COMPONENT><STYLED COMPONENT>

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

// <STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT />
// <STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT />
// <STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT />
// <STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT />
// <STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT /><STYLEDCOMPONENT />

const { height: SCREEN_HEIGHT } = Dimensions.get("window"); //Dimensions 를 이용해서 화면의 크기를 알 수 있음

const Movies = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    // refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    // refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useInfiniteQuery(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    // refetch: refetcTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movies", "trending"], moviesApi.trending);

  const onRefresh = async () => {
    // refetchNowPlaying();
    // refetchUpcoming();
    // refetcTrending();
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData={item}
    />
  );

  const movieKeyExtractor = (item) => item.id + "";

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const loadMore = () => {
    alert("load more!");
  };

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onRefresh={onRefresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 30,
            }}
            loop={true}
            autoplay={true}
            autoplayTimeout={3.5}
            showButtons={false}
            showsPagination={false}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          <HList title="Trending Movies" data={trendingData.results} />
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={movieKeyExtractor}
      ItemSeperatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
