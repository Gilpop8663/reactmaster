import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { getSearchVideo, ISearchMovie } from "../api";
import styled from "styled-components";
import NowMovies from "../Components/NowMovies";
import { useEffect } from "react";

const Wrapper = styled.div`
  padding-top: 500px;
`;

const Loader = styled.div`
  font-size: 48px;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Search() {
  const location = useLocation();
  //console.log("로케이션 : ", location);
  useEffect(() => {}, [location]);
  const keyword: any = location.search
    ? new URLSearchParams(location.search).get("keyword")
    : "";
  const word: string = keyword
    ?.toString()
    .trim()
    ?.replace(/,/g, " ")
    .split(" ")
    .map((item: string) => item.trim().split(" "))
    .join("+");

  const searchData = useQuery<ISearchMovie>(
    ["movies", "search"],
    () => getSearchVideo("tv", word),
    { refetchInterval: 100 }
  );

  const searchData2 = useQuery<ISearchMovie>(
    ["movies", "search2"],
    () => getSearchVideo("movie", word),
    { refetchInterval: 500 }
  );
  const searchData3 = useQuery<ISearchMovie>(
    ["movies", "search3"],
    () => getSearchVideo("person", word),
    { refetchInterval: 500 }
  );
  //console.log(location);
  //console.log(pramas);
  //console.log(location);
  // console.log(keyword);

  //console.log(location);
  //console.log(location);
  //console.log(searchData);
  return (
    <Wrapper key={location.key?.slice(2, 4)}>
      {!searchData.data?.results[0] && !searchData2.data?.results[0] ? (
        <Loader>검색한 결과가 없습니다</Loader>
      ) : (
        <>
          {searchData.data?.results[0] && (
            <NowMovies
              isWhat="tv"
              key={new URLSearchParams(location.search).get("keyword")}
              search={location.search ? location.search : ""}
              videoData={searchData.data?.results}
              sliderTitle={`TV 카테코리 : ${keyword}`}
            />
          )}
          {searchData2.data?.results[0] && (
            <NowMovies
              key={word + "456"}
              search={location.search ? location.search : ""}
              videoData={searchData2.data?.results}
              isWhat="movie"
              sliderTitle={`Movie 카테고리 : ${keyword}`}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
