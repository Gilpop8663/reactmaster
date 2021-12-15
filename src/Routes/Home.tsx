import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMoviesPage1,
  getMoviesPage2,
  getMoviesPage3,
  getMoviesPage4,
  getMoviesPage5,
  getMoviesPage6,
  IGetMoviesProps,
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

const Wrapper = styled.div`
  background-color: black;
`;

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
const Slider = styled.div`
  margin-bottom: 70px;
`;

function Home() {
  const nowMovieData: IMovie[] = [];
  const recommendData: IMovie[] = [];
  const topRateMovies: IMovie[] = [];
  const recommendData2: IMovie[] = [];
  const [isLoading, setIsLoading] = useState(true);
  const nowPage1 = useQuery<IGetMoviesProps>(
    ["movies", "nowPlayingPage1"],
    getMoviesPage1
  );
  const nowPage2 = useQuery<IGetMoviesProps>(
    ["movies", "nowPlayingPage2"],
    getMoviesPage2
  );
  const nowPage3 = useQuery<IGetMoviesProps>(
    ["movies", "nowPlayingPage3"],
    getMoviesPage3
  );
  const nowPage4 = useQuery<IGetMoviesProps>(
    ["movies", "nowPlayingPage4"],
    getMoviesPage4
  );
  const nowPage5 = useQuery<IGetMoviesProps>(
    ["movies", "nowPlayingPage5"],
    getMoviesPage5
  );
  const nowPage6 = useQuery<IGetMoviesProps>(
    ["movies", "nowPlayingPage6"],
    getMoviesPage6
  );

  const topRatePage1 = useQuery<IGetMoviesProps>(
    ["movies", "topRatePage1"],
    topRateMoviePage1
  );

  const topRatePage2 = useQuery<IGetMoviesProps>(
    ["movies", "topRatePage2"],
    topRateMoviePage2
  );

  const topRatePage3 = useQuery<IGetMoviesProps>(
    ["movies", "topRatePage3"],
    topRateMoviePage3
  );

  const topRatePage4 = useQuery<IGetMoviesProps>(
    ["movies", "topRatePage4"],
    topRateMoviePage4
  );

  const topRatePage5 = useQuery<IGetMoviesProps>(
    ["movies", "topRatePage5"],
    topRateMoviePage5
  );

  const topRatePage6 = useQuery<IGetMoviesProps>(
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
            <Slider>
              <NowMovies
                movieData={nowMovieData}
                page1={nowPage1?.data}
                sliderTitle={"지금 뜨는 콘텐츠"}
              />
            </Slider>
          )}
          {topRateMovies && (
            <Slider>
              <NowMovies
                movieData={topRateMovies}
                page1={topRatePage1?.data}
                sliderTitle={"님의 취향 저격 베스트 콘텐츠"}
              />
            </Slider>
          )}
          {recommendData && (
            <Slider>
              <NowMovies
                movieData={recommendData}
                page1={nowPage4?.data}
                sliderTitle={"인기 있는 영화순위"}
              />
            </Slider>
          )}
          {recommendData2 && (
            <Slider>
              <NowMovies
                movieData={recommendData2}
                page1={topRatePage4?.data}
                sliderTitle={"워워드 수상 해외영화"}
              />
            </Slider>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
