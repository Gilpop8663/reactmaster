import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  getMoviesPage1,
  getMoviesPage2,
  getMoviesPage3,
  getMoviesPage4,
  getMoviesPage5,
  getMoviesPage6,
  IGetVideosProps,
  IMovie,
  topRateMoviePage1,
  topRateMoviePage2,
  topRateMoviePage3,
  topRateMoviePage4,
  topRateMoviePage5,
  topRateMoviePage6,
} from "../api";
import NowMovies from "../Components/NowMovies";
import { makeImageHelper } from "../utils";

const Wrapper = styled.div``;

const Banner = styled.div<{ isBack: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.isBack});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
`;

const Loader = styled.div``;

const Title = styled.h2`
  font-size: 64px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 34px;
  width: 50%;
`;

function Home() {
  const nowMovieData: IMovie[] = [];
  const recommendData: IMovie[] = [];
  const topRateMovies: IMovie[] = [];
  const recommendData2: IMovie[] = [];
  const [isLoading, setIsLoading] = useState(true);
  const nowPage1 = useQuery<IGetVideosProps>(
    ["movies", "nowPlayingPage1"],
    getMoviesPage1
  );
  const nowPage2 = useQuery<IGetVideosProps>(
    ["movies", "nowPlayingPage2"],
    getMoviesPage2
  );
  const nowPage3 = useQuery<IGetVideosProps>(
    ["movies", "nowPlayingPage3"],
    getMoviesPage3
  );
  const nowPage4 = useQuery<IGetVideosProps>(
    ["movies", "nowPlayingPage4"],
    getMoviesPage4
  );
  const nowPage5 = useQuery<IGetVideosProps>(
    ["movies", "nowPlayingPage5"],
    getMoviesPage5
  );
  const nowPage6 = useQuery<IGetVideosProps>(
    ["movies", "nowPlayingPage6"],
    getMoviesPage6
  );

  const topRatePage1 = useQuery<IGetVideosProps>(
    ["movies", "topRatePage1"],
    topRateMoviePage1
  );

  const topRatePage2 = useQuery<IGetVideosProps>(
    ["movies", "topRatePage2"],
    topRateMoviePage2
  );

  const topRatePage3 = useQuery<IGetVideosProps>(
    ["movies", "topRatePage3"],
    topRateMoviePage3
  );

  const topRatePage4 = useQuery<IGetVideosProps>(
    ["movies", "topRatePage4"],
    topRateMoviePage4
  );

  const topRatePage5 = useQuery<IGetVideosProps>(
    ["movies", "topRatePage5"],
    topRateMoviePage5
  );

  const topRatePage6 = useQuery<IGetVideosProps>(
    ["movies", "topRatePage6"],
    topRateMoviePage6
  );

  //console.log(nowPage1);
  nowPage1?.data?.results.map((item) => nowMovieData.push(item));
  nowPage2?.data?.results.map((item) => nowMovieData.push(item));
  nowPage3?.data?.results.map((item) => nowMovieData.push(item));

  nowPage4?.data?.results.map((item) => recommendData.push(item));
  nowPage5?.data?.results.map((item) => recommendData.push(item));
  nowPage6?.data?.results.map((item) => recommendData.push(item));

  topRatePage1?.data?.results.map((item) => topRateMovies.push(item));
  topRatePage2?.data?.results.map((item) => topRateMovies.push(item));
  topRatePage3?.data?.results.map((item) => topRateMovies.push(item));

  topRatePage4?.data?.results.map((item) => recommendData2.push(item));
  topRatePage5?.data?.results.map((item) => recommendData2.push(item));
  topRatePage6?.data?.results.map((item) => recommendData2.push(item));
  useEffect(() => {
    setIsLoading(false);
  }, []);
  // console.log(clickedMovie);
  //console.log(index, "인뎃으");
  //console.log(nowMovieData, isLoading);

  const location = useLocation();

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            isBack={makeImageHelper(
              nowPage1.data?.results[0]?.backdrop_path || ""
            )}
          >
            <Title>{nowPage1.data?.results[0].title}</Title>
            <Overview>{nowPage1.data?.results[0].overview}</Overview>
          </Banner>
          {nowMovieData && (
            <NowMovies
              isWhat="movie"
              videoData={nowMovieData}
              search={location.search ? location.search : ""}
              sliderTitle={"지금 뜨는 콘텐츠"}
            />
          )}
          {topRateMovies && (
            <NowMovies
              isWhat="movie"
              videoData={topRateMovies}
              search={location.search ? location.search : ""}
              sliderTitle={"님의 취향 저격 베스트 콘텐츠"}
            />
          )}
          {recommendData && (
            <NowMovies
              isWhat="movie"
              videoData={recommendData}
              search={location.search ? location.search : ""}
              sliderTitle={"인기 있는 영화순위"}
            />
          )}
          {recommendData2 && (
            <NowMovies
              isWhat="movie"
              videoData={recommendData2}
              search={location.search ? location.search : ""}
              sliderTitle={"워워드 수상 해외영화"}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
