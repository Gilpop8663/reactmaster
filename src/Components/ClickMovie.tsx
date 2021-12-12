import { AnimatePresence, motion, MotionValue } from "framer-motion";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImageHelper } from "../utils";

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

interface IClickMovie {
  bigMovieMatch: { params: { movieId: string } };
  nowMovieData: IMovie[];
  scrollY: MotionValue;
}

function ClickMovie({ bigMovieMatch, nowMovieData, scrollY }: IClickMovie) {
  const history = useHistory();
  const onOverlayClicked = () => {
    history.push("/");
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowMovieData.find((item) => item.id === +bigMovieMatch.params.movieId);
  return (
    <AnimatePresence>
      <Overlay
        onClick={onOverlayClicked}
        exit={{ opacity: 0, zIndex: 0 }}
        animate={{ opacity: 1, zIndex: 2 }}
      ></Overlay>
      <BigMovie
        style={{ top: scrollY.get() + 100, zIndex: 4 }}
        layoutId={bigMovieMatch.params.movieId}
      >
        {clickedMovie && (
          <>
            <BigCover
              bgPhoto={makeImageHelper(clickedMovie.backdrop_path, "w500")}
            ></BigCover>
            <BigTitle>{clickedMovie.title}</BigTitle>
            <BigOverview>{clickedMovie.overview}</BigOverview>
          </>
        )}
      </BigMovie>
    </AnimatePresence>
  );
}

export default ClickMovie;
