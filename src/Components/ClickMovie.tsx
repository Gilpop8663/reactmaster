import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieCredit,
  getMovieDetail,
  getSimilarMovie,
  getVideo,
  IGetMovieDetail,
  IGetVideoProps,
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

const BigCover = styled.iframe<{ bgPhoto?: string; userWidth: number }>`
  width: 100%;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  object-fit: cover;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  aspect-ratio: 16/9;
  background-position: center center;
  height: ${(props) =>
    props.userWidth > 1920
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

const BigContainer = styled.div`
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
  bigMovieMatch: { params: { movieId: string } };
  movieData: IMovie[];
  moreMovie?: string;
}

function ClickMovie({ bigMovieMatch, movieData, moreMovie }: IClickMovie) {
  //console.log("빅무비매치임 :", bigMovieMatch, "무비데이터임:", movieData);
  console.log(
    "몰무비임:",
    moreMovie,
    "아이디임:",
    bigMovieMatch.params.movieId
  );
  const clickedMovie =
    bigMovieMatch.params.movieId &&
    movieData.find((item) => item.id === +bigMovieMatch.params.movieId);

  //console.log(clickedMovie);
  const history = useHistory();
  const { scrollY } = useViewportScroll();
  const [clicked, setClicked] = useState(false);

  const onOverlayClicked = () => {
    setOver(false);
    history.push("/");
  };
  //console.log(clicked);
  const [over, setOver] = useState(false);
  const { data } = useQuery<IGetVideoProps>(["movies", "video"], () =>
    getVideo(
      clickedMovie ? clickedMovie.id + "" : bigMovieMatch?.params.movieId
    )
  );
  const detailData = useQuery<IGetMovieDetail>(["movies", "detail"], () =>
    getMovieDetail(bigMovieMatch?.params.movieId)
  );
  const creditData = useQuery<IMovieCredit>(["movies", "credit"], () =>
    getMovieCredit(bigMovieMatch?.params.movieId)
  );
  const similarData = useQuery<ISimilarMovie>(["movies", "similar"], () =>
    getSimilarMovie(bigMovieMatch?.params.movieId)
  );
  //console.log(creditData.data?.cast[0].name);
  const mouseEnter = (event: any) => {
    setOver(true);
  };
  const similarMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  //console.log(data, isLoading);
  //console.log(detailData.data);
  //console.log(similarData.data?.results[0]);
  //console.log(bigMovieMatch.params.movieId);
  const onBoxClicked = (movieId: number) => {
    setOver(false);
    setClicked(true);
    // history.push(`/movies/${movieId}`);
  };
  console.log(similarData.data?.results);

  return (
    <AnimatePresence>
      {clickedMovie && (
        <Overlay
          key={clickedMovie?.id}
          onClick={onOverlayClicked}
          exit={{ opacity: 0, zIndex: 0 }}
          animate={{ opacity: 1, zIndex: 2 }}
        ></Overlay>
      )}
      {detailData && clickedMovie && (
        <BigMovie
          key={clickedMovie.original_title}
          style={{ top: scrollY.get() + 100, zIndex: 4 }}
          layoutId={bigMovieMatch.params.movieId}
        >
          <>
            {data && (
              <BigCover
                onMouseEnter={mouseEnter}
                src={
                  over
                    ? `https://www.youtube.com/embed/${data?.results[0]?.key}?autoplay=1&mute=0&controls=0&loop=1&start=10&playlist=${data?.results[0]?.key}&cc_lang_pref=ko&cc_load_policy=1&modestbranding=1`
                    : ""
                }
                allow="autoplay"
                key={clickedMovie.backdrop_path}
                frameBorder={0}
                userWidth={window.innerWidth}
                bgPhoto={makeImageHelper(clickedMovie.backdrop_path)}
              ></BigCover>
            )}
            <DisableCover isOver={over}></DisableCover>
            <BigContainer>
              <BigTitle key={clickedMovie.title}>{clickedMovie.title}</BigTitle>
              <UserBox>
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
              <DetailGrid>
                <DetailBox>
                  <InfoBox>
                    <MoiveAverage>
                      {clickedMovie.vote_average
                        ? `${(clickedMovie.vote_average * 10).toFixed(0)}% 일치`
                        : ""}
                    </MoiveAverage>
                    <MovieInfoTop>
                      {clickedMovie.release_date.slice(0, 4)}년
                    </MovieInfoTop>
                    <MovieInfoTop>
                      {detailData.data?.runtime === 0
                        ? ``
                        : `${detailData.data?.runtime}분`}
                    </MovieInfoTop>
                  </InfoBox>
                  <BigOverview key={clickedMovie.overview}>
                    {clickedMovie.overview}
                  </BigOverview>
                </DetailBox>
                <DetailBox>
                  <InfoBox>
                    <InfoSpan>장르:</InfoSpan>
                    {detailData.data?.genres.map((item) => (
                      <MovieInfo key={item.id}>{item.name},</MovieInfo>
                    ))}
                  </InfoBox>

                  <InfoBox>
                    <InfoSpan>출연진:</InfoSpan>
                    <MovieInfo>{creditData.data?.cast[0].name},</MovieInfo>
                    <MovieInfo>{creditData.data?.cast[1].name},</MovieInfo>
                    <MovieInfo>{creditData.data?.cast[2].name}</MovieInfo>
                  </InfoBox>
                  <InfoBox>
                    <InfoSpan>크리에이터:</InfoSpan>
                    <MovieInfo>{creditData.data?.crew[0].name},</MovieInfo>
                    <MovieInfo>{creditData.data?.crew[1].name},</MovieInfo>
                    <MovieInfo>{creditData.data?.crew[2].name}</MovieInfo>
                  </InfoBox>
                </DetailBox>
              </DetailGrid>
              <MoreBox>
                {Array.from({ length: 9 }, (v, i) => i).map((item) => (
                  <MoreMovie
                    onClick={() =>
                      onBoxClicked(
                        similarData?.data
                          ? similarData?.data?.results[item].id
                          : 0
                      )
                    }
                  >
                    {similarMatch && similarData.data?.results && (
                      <Link
                        to={{
                          pathname: `/movies/${similarData.data?.results[item].id}`,
                          state: {
                            bigMovieMatch: similarMatch,
                            movieData: similarData.data?.results,
                            moreMovie: similarMatch,
                          },
                        }}
                      >
                        <MoreCover
                          bgPhoto={makeImageHelper(
                            similarData.data?.results[item]?.backdrop_path
                              ? similarData.data?.results[item]?.backdrop_path
                              : ""
                          )}
                        ></MoreCover>
                        <MoreInfoBox>
                          <MoreTitle>
                            {similarData.data?.results[item].title}
                          </MoreTitle>
                          <MoiveAverage>
                            {similarData.data?.results[item].vote_average
                              ? `${(
                                  similarData.data?.results[item].vote_average *
                                  10
                                ).toFixed(0)}%일치`
                              : ""}
                          </MoiveAverage>
                          <MoreInfo>
                            {similarData.data?.results[item].release_date.slice(
                              0,
                              4
                            )}
                          </MoreInfo>
                          {similarData.data?.results[item].overview && (
                            <MoreInfo>
                              {similarData.data?.results[item].overview.length >
                              200
                                ? `${similarData.data?.results[
                                    item
                                  ].overview.slice(0, 200)}...`
                                : similarData.data?.results[item].overview}
                            </MoreInfo>
                          )}
                        </MoreInfoBox>
                      </Link>
                    )}
                  </MoreMovie>
                ))}
              </MoreBox>
            </BigContainer>
          </>
        </BigMovie>
      )}
    </AnimatePresence>
  );
}

export default ClickMovie;
