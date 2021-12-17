import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesProps, IMovie } from "../api";
import { makeImageHelper } from "../utils";
import ClickMovie from "./ClickMovie";
import ClickTv from "./ClickTv";

const Slider = styled.div`
  position: relative;
  height: 180px;
  top: -170px;
`;

const Row = styled(motion.div)<{ isFirst: number; hover: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.hover === false
      ? "repeat(6, 1fr) 0.2fr"
      : "0.2fr repeat(6, 1fr) 0.2fr"};
  gap: 5px;
  width: 100%;
  margin-top: 16px;
  padding: ${(props) =>
    props.hover === false ? "0px 0px 0px 65px" : "0px 0px 0px 0px"};
  position: absolute;
`;

const Box = styled(motion.div)<{ hover?: boolean; bgPhoto: string }>`
  background-color: white;
  height: 180px;
  font-size: 66px;
  background-image: ${(props) =>
    props.bgPhoto === `https://image.tmdb.org/t/p/w500/`
      ? `url(
          "https://lh3.googleusercontent.com/proxy/iMS9Htm7Nxk5phLAi9872VBCPpw7CyJLhjYtyoG0K8pMfgEYi4aSkWo8l7_pz7pq-KkF_-_pvhPxurMR4RN6kOg"
        )`
      : `url(${props.bgPhoto})`};
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  &:hover {
    z-index: 2;
  }
  &:first-child {
    transform-origin: ${(props) =>
      props.hover ? "center left" : "center left"};
  }
  &:nth-child(2) {
    transform-origin: ${(props) =>
      props.hover ? "center left" : "center center"};
  }
  &:nth-child(6) {
    transform-origin: ${(props) =>
      props.hover ? "center center" : "center right"};
  }
  &:nth-child(7) {
    transform-origin: ${(props) =>
      props.hover ? "center right" : "center center"};
  }
`;

const Archive = styled.span`
  font-size: 32px;
  font-weight: 600;
  padding-left: 65px;
`;

const ArrowBtn = styled(motion.div)`
  color: white;
  z-index: 1;
  width: 65px;
  height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -50px;
  i {
    position: relative;
    text-align: center;
  }

  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
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

const ArchiveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const IndexBoxs = styled.div`
  display: flex;
  padding-right: 65px;
`;

const IndexBox = styled(motion.div)<{ index: boolean }>`
  width: 10px;
  margin-left: 2px;
  height: 2px;
  background-color: ${(props) =>
    props.index ? props.theme.white.lighter : props.theme.black.lighter};
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

const ArrowVariants: Variants = {
  btnNormal: {
    backgroundColor: "rgba(0,0,0,0.5)",
    fontSize: "20px",
    color: "rgba(255,255,255,0)",
  },
  btnHover: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    fontSize: "30px",
    color: "rgba(255,255,255,1)",
  },
  exit: {
    opacity: 0,
  },
};

const offset = 6;

interface INowProps {
  movieData: IMovie[];
  page1?: IGetMoviesProps;
  sliderTitle: string;
  search?: string;
}

function TvSlider({ movieData, page1, sliderTitle, search }: INowProps) {
  const history = useHistory();
  const location = useLocation();
  //console.log(pathName);
  const [leaving, setLeaving] = useState(false);
  const [rowHover, setRowHover] = useState(false);
  const rowMouseEnterLeave = () => {
    setRowHover((prev) => !prev);
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const [back, setBack] = useState(false);
  const [hover, setHover] = useState(false);
  const [index, setIndex] = useState(0);
  const totalMovies = movieData.length - 1;
  const maxIndex = Math.floor(totalMovies / offset) - 1;
  const decreaseIndex = () => {
    if (page1) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();

      setIndex((prev) => (index === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseIndex = () => {
    if (page1) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      setHover(true);
      console.log("맥스인덱스 : ", maxIndex, "인덱스 : ", index);
      setIndex((prev) => (index === maxIndex ? 0 : prev + 1));
    }
  };
  const keyword = new URLSearchParams(location.search).get("keyword");
  const onBoxClicked = (movieId: number) => {
    if (!search) {
      history.push(`/movies/${movieId}`);
    } else if (search) {
      history.push(`/search?keyword=${keyword}&movies=${movieId}`);
    }
  };
  const bigMovieMatch = useRouteMatch<{ movieId?: string }>(
    !search ? `/movies/:movieId` : `/search`
  );
  //console.log("빅매치임", bigMovieMatch);
  //console.log(bigMovieMatch);
  //console.log("로우 호버의 값: ", rowHover);

  return (
    <>
      <Slider
        key={index + 324}
        onMouseLeave={rowMouseEnterLeave}
        onMouseEnter={rowMouseEnterLeave}
      >
        <AnimatePresence
          onExitComplete={toggleLeaving}
          initial={false}
          key={index + 82312}
          custom={back}
        >
          <ArchiveContainer key={index + 8678}>
            <Archive key={sliderTitle + "cvxbfg"}>{sliderTitle}</Archive>
            <IndexBoxs key={index + 7787}>
              {rowHover &&
                Array.from({ length: maxIndex + 1 }, (v, i) => i).map(
                  (item) => (
                    <IndexBox key={item} index={item === index}></IndexBox>
                  )
                )}
            </IndexBoxs>
          </ArchiveContainer>
          {hover && (
            <ArrowBtn
              key="leftBtn"
              onClick={decreaseIndex}
              variants={ArrowVariants}
              initial="btnNormal"
              animate="btnNormal"
              exit="btnNormal"
              transition={{ type: "tween", duration: 0.2 }}
              whileHover="btnHover"
            >
              <motion.i key="leftI" className="fas fa-chevron-left"></motion.i>
            </ArrowBtn>
          )}
          <Row
            key={index}
            custom={back}
            isFirst={index}
            hover={hover}
            variants={rowVariants}
            animate="visible"
            initial="hidden"
            exit="exit"
            transition={{ type: "easy-in-out", duration: 0.5 }}
          >
            {hover === true ? (
              <Box
                key="prevBox"
                variants={boxVariants}
                initial={false}
                transition={{ type: "tween", duration: 0.1 }}
                bgPhoto={makeImageHelper(
                  movieData
                    ? index === 0
                      ? movieData[
                          Math.floor((movieData.length - 1) / 6) * offset
                        ]?.backdrop_path
                      : movieData[offset * index]?.backdrop_path
                    : "",
                  "w500"
                )}
              ></Box>
            ) : null}
            {movieData
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((item) => (
                <Box
                  layoutId={item.id + ""}
                  onClick={() => onBoxClicked(item.id)}
                  hover={hover}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween", duration: 0.1 }}
                  bgPhoto={makeImageHelper(
                    item.backdrop_path
                      ? item.backdrop_path
                      : item.poster_path
                      ? item.poster_path
                      : "",
                    "w500"
                  )}
                  key={item.id}
                >
                  <Info key="movieInfo" variants={infoVariants}>
                    <h4 key="movieTitle">{item.title}</h4>
                  </Info>
                </Box>
              ))}
            {index !== maxIndex ? (
              <Box
                key="nextBox"
                variants={boxVariants}
                initial="normal"
                layoutId={movieData[offset * index + offset + 1]?.id + ""}
                transition={{ type: "tween", duration: 0.1 }}
                bgPhoto={makeImageHelper(
                  movieData
                    ? movieData[offset * index + offset + 1]?.backdrop_path
                    : "",
                  "w500"
                )}
              ></Box>
            ) : (
              <Box
                key="nextBox"
                variants={boxVariants}
                initial="normal"
                layoutId={movieData[1].id + ""}
                transition={{ type: "tween", duration: 0.1 }}
                bgPhoto={makeImageHelper(
                  movieData ? movieData[1]?.backdrop_path : "",
                  "w500"
                )}
              ></Box>
            )}
          </Row>
          (
          <ArrowBtn
            key="rightBtn"
            variants={ArrowVariants}
            initial="btnNormal"
            animate="btnNormal"
            exit="btnNormal"
            transition={{ type: "tween", duration: 0.2 }}
            whileHover="btnHover"
            onClick={increaseIndex}
          >
            <motion.i key="rightI" className="fas fa-chevron-right"></motion.i>
          </ArrowBtn>
          )
        </AnimatePresence>
      </Slider>
      {bigMovieMatch ? <ClickTv /> : null}
    </>
  );
}

export default React.memo(TvSlider);
