import { useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router";
import styled from "styled-components";
import {
  getMoviesPage1,
  getMoviesPage2,
  getMoviesPage3,
  IGetMoviesProps,
  IMovie,
} from "../api";
import ClickMovie from "../Components/ClickMovie";
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

function Home() {
  const nowMovieData: IMovie[] = [];
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
  //console.log(nowPage1);
  nowPage1?.data?.results.map((item) => nowMovieData.push(item));
  nowPage2?.data?.results.map((item) => nowMovieData.push(item));
  nowPage3?.data?.results.map((item) => nowMovieData.push(item));
  console.log(nowMovieData);
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();

  // console.log(clickedMovie);
  //console.log(index, "인뎃으");
  //console.log(nowMovieData, isLoading);
  return (
    <Wrapper>
      {nowPage1.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            isBack={makeImageHelper(
              nowPage1.data?.results[0]?.backdrop_path || ""
            )}
          >
            <Title>{nowMovieData[0].title}</Title>
            <Overview>{nowMovieData[0].overview}</Overview>
          </Banner>
          <NowMovies nowMovieData={nowMovieData} page1={nowPage1?.data} />

          {bigMovieMatch ? (
            <ClickMovie
              bigMovieMatch={bigMovieMatch}
              nowMovieData={nowMovieData}
              scrollY={scrollY}
            />
          ) : null}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
