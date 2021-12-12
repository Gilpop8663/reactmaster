import {
  AnimatePresence,
  motion,
  useViewportScroll,
  Variants,
} from "framer-motion";
import React, { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import {
  getMoviesPage1,
  getMoviesPage2,
  IGetMoviesProps,
  IMovie,
} from "../api";
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
  position: relative;
  height: 180px;
  top: -170px;
`;

const Row = styled(motion.div)<{ isFirst: number }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isFirst === 0
      ? "repeat(6, 1fr) 0.2fr"
      : "0.2fr repeat(6, 1fr) 0.2fr"};
  gap: 5px;
  width: 100%;
  margin-top: 16px;
  padding: ${(props) =>
    props.isFirst === 0 ? "0px 0px 0px 65px" : "0px 0px 0px 0px"};
  position: absolute;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 180px;
  font-size: 66px;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:nth-child(6) {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 100%;
  bottom: 0;
  opacity: 0;
  h4 {
    font-size: 14px;
    text-align: center;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div<{ bgPhoto: string }>`
  width: 100%;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 400px;
  border: none;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -80px;
`;

const Archive = styled.span`
  font-size: 32px;
  font-weight: 600;
  padding-left: 50px;
`;

const rowVariants: Variants = {
  hidden: (back: boolean) => ({
    x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
  visible: { x: 0 },
  exit: (back: boolean) => ({
    x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
};

const boxVariants: Variants = {
  normal: { scale: 1, transition: { type: "tween" } },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.1, type: "tween" },
  },
};

const offset = 6;

const ArrowVariants: Variants = {
  btnNormal: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  btnHover: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  iNormal: {
    scale: 1,
  },
  iHover: {
    scale: 1.4,
  },
  exit: {
    opacity: 0,
  },
};

const ArrowBtn = styled(motion.div)`
  z-index: 1;
  color: white;
  width: 65px;
  height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  position: absolute;
  bottom: -50px;
  i {
    position: relative;
  }
  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
  }
`;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const [back, setBack] = useState(false);
  const nowPage1 = useQuery<IGetMoviesProps>(
    ["movies", "nowPlayingPage1"],
    getMoviesPage1
  );
  const nowPage2 = useQuery<IGetMoviesProps>(
    ["movies", "nowPlayingPage2"],
    getMoviesPage2
  );
  const nowMovieData: IMovie[] = [];
  nowPage1?.data?.results.map((item) => nowMovieData.push(item));
  nowPage2?.data?.results.map((item) => nowMovieData.push(item));
  console.log(nowPage1);
  console.log(nowMovieData);
  const [index, setIndex] = useState(0);
  const decreaseIndex = () => {
    if (nowPage1.data) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();
      const totalMovies = nowMovieData.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (index === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseIndex = () => {
    if (nowPage1.data) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalMovies = nowMovieData.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (index === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const onOverlayClicked = () => {
    history.push("/");
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowMovieData.find((item) => item.id === +bigMovieMatch.params.movieId);

  // console.log(clickedMovie);
  console.log(index, "인뎃으");
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
          <Slider>
            <Archive>지금 뜨는 콘텐츠</Archive>
            <AnimatePresence
              onExitComplete={toggleLeaving}
              initial={false}
              custom={back}
            >
              <ArrowBtn
                onClick={decreaseIndex}
                variants={ArrowVariants}
                initial="btnNormal"
                animate="btnNormal"
                exit="exit"
                whileHover="btnHover"
              >
                <motion.i
                  variants={ArrowVariants}
                  initial="iNormal"
                  animate="iNormal"
                  whileHover="iHover"
                  className="fas fa-chevron-left"
                ></motion.i>
              </ArrowBtn>
              <Row
                custom={back}
                isFirst={index}
                variants={rowVariants}
                animate="visible"
                initial="hidden"
                exit="exit"
                key={index}
                transition={{ type: "tween", duration: 0.4 }}
              >
                {index === 0 ? (
                  <></>
                ) : (
                  <Box
                    variants={boxVariants}
                    initial={false}
                    key={index}
                    transition={{ type: "tween", duration: 0.1 }}
                    bgPhoto={makeImageHelper(
                      nowMovieData
                        ? nowMovieData[offset * index - 1]?.backdrop_path
                        : "",
                      "w500"
                    )}
                  ></Box>
                )}
                {nowMovieData
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((item) => (
                    <Box
                      layoutId={item.id + ""}
                      onClick={() => onBoxClicked(item.id)}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween", duration: 0.1 }}
                      bgPhoto={makeImageHelper(item.backdrop_path, "w500")}
                      key={item.id}
                    >
                      <Info variants={infoVariants}>
                        <h4>{item.title}</h4>
                      </Info>
                    </Box>
                  ))}
                {index !== Math.floor((nowMovieData.length - 1) / 6) - 1 ? (
                  <Box
                    variants={boxVariants}
                    initial="normal"
                    layoutId={nowMovieData[offset * index + offset + 1].id + ""}
                    transition={{ type: "tween", duration: 0.1 }}
                    key={nowMovieData[offset * index + offset + 1].overview}
                    bgPhoto={makeImageHelper(
                      nowMovieData
                        ? nowMovieData[offset * index + offset + 1]
                            ?.backdrop_path
                        : "",
                      "w500"
                    )}
                  ></Box>
                ) : (
                  <Box
                    variants={boxVariants}
                    initial="normal"
                    layoutId={nowMovieData[1].id + ""}
                    transition={{ type: "tween", duration: 0.1 }}
                    key={nowMovieData[1].title}
                    bgPhoto={makeImageHelper(
                      nowMovieData ? nowMovieData[1]?.backdrop_path : "",
                      "w500"
                    )}
                  ></Box>
                )}
              </Row>
              (
              <ArrowBtn
                onClick={increaseIndex}
                variants={ArrowVariants}
                initial="btnNormal"
                animate="btnNormal"
                whileHover="btnHover"
              >
                <motion.i
                  variants={ArrowVariants}
                  animate="iNormal"
                  initial="iNormal"
                  whileHover="iHover"
                  className="fas fa-chevron-right"
                ></motion.i>
              </ArrowBtn>
              )
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                ></Overlay>
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        bgPhoto={makeImageHelper(
                          clickedMovie.backdrop_path,
                          "w500"
                        )}
                      ></BigCover>
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
