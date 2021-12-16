import {
  AnimatePresence,
  motion,
  useViewportScroll,
  Variants,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieCredit,
  getMovieDetail,
  getSimilarMovie,
  IGetMovieDetail,
  IMovie,
  IMovieCredit,
  ISimilarMovie,
} from "../api";
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
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 15px;
  min-width: 426px;
  background-color: ${(props) => props.theme.black.veryDark};
`;

const DisableCover = styled.div<{ isOver: boolean }>`
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: ${(props) => (props.isOver ? 100 : -2)};
`;

const BigCover = styled(motion.iframe)<{ bgPhoto?: string; userWidth: number }>`
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  aspect-ratio: 16/9;
  width: 100%;
  background-position: center center;
  height: ${(props) =>
    props.userWidth > 3840
      ? 2160
      : props.userWidth > 2560
      ? 1440
      : props.userWidth > 1920
      ? 1080
      : props.userWidth > 1280
      ? 720
      : props.userWidth > 854
      ? 480
      : props.userWidth > 640
      ? 360
      : 240};

  border: none;
`;

const BigContainer = styled(motion.div)`
  padding: 50px;
  top: -230px;
  position: relative;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 48px;
  position: relative;
  margin-bottom: 50px;
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  margin-bottom: 100px;
  font-size: 19px;
  font-weight: 400;
  line-height: 25px;
  width: 80%;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
`;

const PlayCircle = styled.div`
  width: 40px;
  margin-left: 10px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid ${(props) => props.theme.white.darker};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white.lighter};
  font-size: 18px;
  font-weight: 100;
  i {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Playbox = styled.div`
  width: 150px;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  background-color: ${(props) => props.theme.white.lighter};
  i {
    margin-right: 10px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const InfoSpan = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.white.veryDark};
`;

const MovieInfoTop = styled.span`
  color: ${(props) => props.theme.white.darker};
  margin-left: 5px;
  font-size: 16px;
  font-weight: 400;
`;

const MovieInfo = styled.span`
  color: ${(props) => props.theme.white.darker};
  margin-left: 5px;
  display: flex;
  line-height: 18px;
  align-items: center;
`;

const MoiveAverage = styled.span`
  font-weight: 600;
  color: #42c262;
  font-size: 16px;
  margin-bottom: 10px;
`;

const MoreBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  grid-template-rows: repeat(3, minmax(100px, 1fr));
  width: 100%;
`;

const MoreMovie = styled.div`
  cursor: pointer;
  width: 100%;
  border-radius: 10px;

  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.darker};
`;
const MoreCover = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
  height: 180px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 10px;
`;

const MoreInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
`;

const MoreInfo = styled.span`
  display: flex;
  margin-bottom: 10px;
  font-size: 14px;
  align-items: center;
  line-height: 18px;
`;

const MoreTitle = styled.span`
  margin-bottom: 10px;
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

interface IClickMovie {
  bigMovieMatch?: { params?: { movieId?: string } };
  movieData: IMovie[];
  search?: string | "";
}

const opacityV: Variants = {
  normal: {
    opacity: 1,
  },
  entry: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
};

function ClickMovie({ bigMovieMatch, movieData, search }: IClickMovie) {
  //console.log("빅무비매치임 :", bigMovieMatch, "무비데이터임:", movieData);
  //console.log(movieData, isSearch);
  //console.log(moreMovie);
  // useEffect(() => {}, [bigMovieMatch?.params.movieId]);
  //console.log(similarData.data?.results[0].id);
  const history = useHistory();
  const { scrollY } = useViewportScroll();
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    setClicked(false);
  }, [clicked]);
  // console.log(history);
  const location = useLocation();
  const newId: string = new URLSearchParams(location.search).get("movies")
    ? String(new URLSearchParams(location.search).get("movies"))
    : "";

  const isSearch = bigMovieMatch?.params?.movieId
    ? bigMovieMatch?.params.movieId
    : newId;
  //console.log(isSearch);
  const keyword = new URLSearchParams(location.search).get("keyword");
  const backUrl = `${location.pathname}?keyword=${keyword}`;
  //console.log(location.pathname);
  //  console.log(backUrl);
  const onOverlayClicked = () => {
    setOver(false);
    if (!search) {
      history.push("/");
    } else {
      history.push(`${backUrl}`);
    }
    //history.push(location);
  };
  //console.log(clicked);
  const [over, setOver] = useState(false);
  // const { data } = useQuery<IGetVideoProps>(["movies", "video"], () =>
  //   getVideo(bigMovieMatch?.params.movieId)
  // );
  const detailData = useQuery<IGetMovieDetail>(["movies", "detail"], () =>
    getMovieDetail(isSearch)
  );
  const creditData = useQuery<IMovieCredit>(["movies", "credit"], () =>
    getMovieCredit(isSearch)
  );
  //console.log(creditData.data?.cast[0].name);
  const similarData = useQuery<ISimilarMovie>(["movies", "similar"], () =>
    getSimilarMovie(isSearch)
  );

  console.log(isSearch, detailData.data);
  //console.log(similarData.data?.results[0].id);
  // const clickedMovie =
  //   bigMovieMatch.params.movieId &&
  //   movieData.find((item) => item.id === +bigMovieMatch.params.movieId)
  //     ? movieData.find((item) => item.id === +bigMovieMatch.params.movieId)
  //     : similarData?.data?.results?.find(
  //         (item) => item.id === +bigMovieMatch.params.movieId
  //       );

  const clickedMovie =
    isSearch &&
    (movieData.find((item) => item.id === +isSearch)
      ? movieData.find((item) => item.id === +isSearch)
      : detailData.data);

  const mouseEnter = (event: any) => {
    setOver(true);
  };
  const similarMatch = useRouteMatch<{ movieId: string }>(
    !search ? `/movies/:movieId` : `/search`
  );
  //console.log(data, isLoading);
  //console.log(detailData.data);
  //console.log(similarData.data?.results[0]);
  //console.log(bigMovieMatch.params.movieId);
  const onBoxClicked = (movieId: number) => {
    setOver(false);
    setClicked(true);
    if (!search) {
      history.push(`/movies/${movieId}`);
    } else if (search) {
      history.push(
        `${location.pathname}?$keyword=${keyword}&movies=${movieId}`
      );
    }
  };
  //console.log(moreMovie);
  //console.log(clickedMovie?.poster_path);
  // console.log(clickedMovie);
  // console.log("무비ㅏ아이디임", movieId);
  // console.log(
  //   "시밀러 데이터 :",
  //   similarData.data?.results,
  //   "클릭임:",
  //   clicked,
  //   "시밀러맷치",
  //   similarMatch
  // );
  // console.log(detailData.data);
  return (
    <AnimatePresence key={isSearch + "cxv"}>
      {clickedMovie && (
        <Overlay
          key={clickedMovie.vote_average + "4vc5"}
          onClick={onOverlayClicked}
          exit={{ opacity: 0, zIndex: 0 }}
          animate={{ opacity: 1, zIndex: 2 }}
        ></Overlay>
      )}
      {clickedMovie && (
        <BigMovie
          variants={opacityV}
          initial="entry"
          animate="normal"
          exit="exit"
          transition={{ delay: 0.3, duration: 0.5, type: "tween" }}
          key={clickedMovie.original_title + "ERyt"}
          style={{ top: scrollY.get() + 100, zIndex: 4 }}
          layoutId={isSearch}
        >
          <>
            {detailData.data?.videos?.results[0] ? (
              <BigCover
                onMouseEnter={mouseEnter}
                src={
                  over
                    ? `https://www.youtube.com/embed/${detailData.data?.videos?.results[0]?.key}?autoplay=1&mute=0&controls=0&loop=1&start=10&playlist=${detailData.data?.videos?.results[0]?.key}&cc_lang_pref=ko&cc_load_policy=1&modestbranding=1`
                    : ""
                }
                allow="autoplay"
                key={detailData.data?.videos.results[0].key + "CVncn"}
                frameBorder={0}
                userWidth={window.innerWidth}
                bgPhoto={makeImageHelper(
                  clickedMovie.backdrop_path
                    ? clickedMovie.backdrop_path
                    : clickedMovie.poster_path
                    ? clickedMovie.poster_path
                    : ""
                )}
              ></BigCover>
            ) : (
              <BigCover
                key={clickedMovie.poster_path}
                userWidth={window.innerWidth}
                bgPhoto={makeImageHelper(
                  clickedMovie.backdrop_path
                    ? clickedMovie.backdrop_path
                    : clickedMovie.poster_path
                    ? clickedMovie.poster_path
                    : ""
                )}
              ></BigCover>
            )}
            <DisableCover
              key={clickedMovie.release_date + "xc7aqw"}
              isOver={over}
            ></DisableCover>
            <BigContainer>
              <BigTitle key={clickedMovie.title}>{clickedMovie.title}</BigTitle>
              <UserBox key={clickedMovie.popularity + "xc7"}>
                <Playbox>
                  <i className="fas fa-play"></i>
                  <span>재생</span>
                </Playbox>
                <PlayCircle>
                  <i className="fas fa-plus"></i>
                </PlayCircle>
                <PlayCircle>
                  <i className="far fa-thumbs-up"></i>
                </PlayCircle>
                <PlayCircle>
                  <i className="far fa-thumbs-down"></i>
                </PlayCircle>
              </UserBox>
              <DetailGrid key={detailData.data?.runtime + "zas74"}>
                <DetailBox key={detailData.data?.release_date + "x54s"}>
                  <InfoBox>
                    <MoiveAverage key={clickedMovie.vote_count + "as57s"}>
                      {clickedMovie.vote_average
                        ? `${(clickedMovie.vote_average * 10).toFixed(0)}% 일치`
                        : ""}
                    </MoiveAverage>
                    <MovieInfoTop key={clickedMovie.release_date + "14a778a"}>
                      {clickedMovie.release_date
                        ? clickedMovie.release_date.slice(0, 4)
                        : clickedMovie.release_date}
                      년
                    </MovieInfoTop>
                    <MovieInfoTop key={detailData.data?.runtime + "1234"}>
                      {detailData.data?.runtime === 0
                        ? ""
                        : detailData.data?.runtime === null
                        ? ""
                        : `${detailData.data?.runtime}분`}
                    </MovieInfoTop>
                  </InfoBox>
                  <BigOverview key={clickedMovie.overview}>
                    {clickedMovie.overview}
                  </BigOverview>
                </DetailBox>
                {detailData.data?.genres &&
                  creditData.data?.crew &&
                  creditData.data?.cast && (
                    <DetailBox>
                      <InfoBox>
                        <InfoSpan>장르:</InfoSpan>
                        {detailData.data?.genres.map((item) => (
                          <MovieInfo key={item.id}>{item.name},</MovieInfo>
                        ))}
                      </InfoBox>

                      <InfoBox>
                        <InfoSpan>출연진:</InfoSpan>
                        <MovieInfo key={clickedMovie.overview}>
                          {creditData.data?.cast[0]
                            ? `${creditData.data?.cast[0].name},`
                            : ""}
                        </MovieInfo>
                        <MovieInfo key={clickedMovie.id + "zxc54a"}>
                          {creditData.data?.cast[1]
                            ? `${creditData.data?.cast[1].name},`
                            : ""}
                        </MovieInfo>
                        <MovieInfo key={clickedMovie.original_title + "Sdf8"}>
                          {creditData.data?.cast[2]
                            ? `${creditData.data?.cast[2].name}`
                            : ""}
                        </MovieInfo>
                      </InfoBox>
                      <InfoBox>
                        <InfoSpan>크리에이터:</InfoSpan>
                        <MovieInfo key={clickedMovie.overview + "Fxc74"}>
                          {creditData.data?.crew[0]
                            ? `${creditData.data?.crew[0].name},`
                            : ""}
                        </MovieInfo>
                        <MovieInfo key={clickedMovie.popularity + "ewg4"}>
                          {creditData.data?.crew[1]
                            ? `${creditData.data?.crew[1].name},`
                            : ""}
                        </MovieInfo>
                        <MovieInfo key={clickedMovie.poster_path}>
                          {creditData.data?.crew[2]
                            ? `${creditData.data?.crew[2].name}`
                            : ""}
                        </MovieInfo>
                      </InfoBox>
                    </DetailBox>
                  )}
              </DetailGrid>
              {similarData?.data?.results && (
                <MoreBox key={detailData.data?.imdb_id + "bcv7"}>
                  {similarData.data?.results[9] &&
                    Array.from({ length: 9 }, (v, i) => i).map((item) => (
                      <MoreMovie
                        key={similarData.data?.results[item].id}
                        onClick={() =>
                          onBoxClicked(
                            similarData?.data
                              ? similarData?.data?.results[item].id
                              : 0
                          )
                        }
                      >
                        {similarMatch && similarData.data?.results && (
                          <MoreCover
                            key={similarData.data?.results[item].original_title}
                            bgPhoto={makeImageHelper(
                              similarData.data?.results[item]?.backdrop_path
                                ? similarData.data?.results[item]?.backdrop_path
                                : similarData.data.results[item].poster_path
                            )}
                          ></MoreCover>
                        )}
                        <MoreInfoBox
                          key={similarData.data?.results[item].overview}
                        >
                          <MoreTitle
                            key={similarData.data?.results[item].title}
                          >
                            {similarData.data?.results[item].title}
                          </MoreTitle>
                          <MoiveAverage
                            key={similarData.data?.results[item].genre_ids[0]}
                          >
                            {similarData.data?.results[item].vote_average
                              ? `${(
                                  similarData.data?.results[item].vote_average *
                                  10
                                ).toFixed(0)}%일치`
                              : ""}
                          </MoiveAverage>
                          <MoreInfo
                            key={similarData.data?.results[item].poster_path}
                          >
                            {similarData.data?.results[item].release_date.slice(
                              0,
                              4
                            )}
                          </MoreInfo>
                          {similarData.data?.results[item].overview && (
                            <MoreInfo
                              key={
                                similarData.data?.results[item].release_date +
                                "cbbike"
                              }
                            >
                              {similarData.data?.results[item].overview.length >
                              200
                                ? `${similarData.data?.results[
                                    item
                                  ].overview.slice(0, 200)}...`
                                : similarData.data?.results[item].overview}
                            </MoreInfo>
                          )}
                        </MoreInfoBox>
                      </MoreMovie>
                    ))}
                </MoreBox>
              )}
            </BigContainer>
          </>
        </BigMovie>
      )}
      {similarData.data?.results && clicked && similarMatch ? (
        <ClickMovie
          key={similarData.data.results[0].id + "RGd"}
          bigMovieMatch={similarMatch}
          movieData={similarData.data?.results}
          search={search}
        />
      ) : null}
      )
    </AnimatePresence>
  );
}

export default ClickMovie;
