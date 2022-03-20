import React from "react";
import { Text, View, FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HList = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 30 }}
        data={data}
        horizontal
        keyExtractor={(item) => item.id + ""}
        ItemSeparatorComponent={VSeparator}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
