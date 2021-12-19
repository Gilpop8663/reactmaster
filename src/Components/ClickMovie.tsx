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
  getSimilarData,
  getVideoCredit,
  getVideoDetail,
  IGetVideoDetail,
  IMovie,
  ISimilarProps,
  IVideoCredit,
} from "../api";
import { makeImageHelper } from "../utils";

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
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
  bigVideoMatch: { params?: { movieId?: string | null; tvId?: string | null } };
  videoData: IMovie[];
  isWhat: string;
  search?: string;
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

function ClickMovie({ bigVideoMatch, isWhat, videoData, search }: IClickMovie) {
  //console.log(videoData);
  const history = useHistory();
  const { scrollY } = useViewportScroll();
  const [over, setOver] = useState(false);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    setClicked(false);
  }, [clicked]);
  // console.log(history);
  const location = useLocation();
  const movieKeyword: string = new URLSearchParams(location.search).get(
    "movies"
  )
    ? String(new URLSearchParams(location.search).get("movies"))
    : "";

  const tvKeyword: string = new URLSearchParams(location.search).get("tv")
    ? String(new URLSearchParams(location.search).get("tv"))
    : "";

  const searchKeyword = movieKeyword ? movieKeyword : tvKeyword;

  const movieSearch = bigVideoMatch?.params?.movieId
    ? bigVideoMatch?.params.movieId
    : searchKeyword;

  // console.log(movieSearch);

  const tvSearch = bigVideoMatch?.params?.tvId
    ? bigVideoMatch.params.tvId
    : searchKeyword;

  const isSearch = movieSearch ? movieSearch : tvSearch;
  // console.log(
  //   `isSearch: ${isSearch}, movieSearch : ${movieSearch}, tvSearch : ${tvSearch}`
  // );
  //console.log(isSearch);
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  const backUrl = `${location.pathname}?keyword=${keyword}`;
  //console.log(location.pathname);
  //  console.log(backUrl);
  const onOverlayClicked = () => {
    setOver(false);
    if (!search) {
      if (isWhat === "movie") {
        history.push("/");
      } else if (isWhat === "tv") {
        history.push("/tv");
      }
    } else {
      history.push(`${backUrl}`);
    }
    //history.push(location);
  };

  const creditData = useQuery<IVideoCredit>(["video", "credit"], () =>
    getVideoCredit(isWhat, isSearch)
  );

  const similarData = useQuery<ISimilarProps>(["video", "similar"], () =>
    getSimilarData(isWhat, isSearch)
  );

  //console.log(similarData.data?.results);
  //console.log(clicked);
  // const { data } = useQuery<IGetVideoProps>(["movies", "video"], () =>
  //   getVideo(bigVideoMatch=.params.movieId)
  // );

  //console.log(similarMovieData);
  // console.log(isSearch, creditData.data);
  //console.log(similarData.data?.results[0].id);
  // const clickedData =
  //   bigVideoMatch=params.movieId &&
  //   movieData.find((item) => item.id === +bigVideoMatch=params.movieId)
  //     ? movieData.find((item) => item.id === +bigVideoMatch=params.movieId)
  //     : similarData?.data?.results?.find(
  //         (item) => item.id === +bigVideoMatch=params.movieId
  //       );
  const similarMovieMatch = useRouteMatch<{ movieId: string }>(
    !search ? `/movies/:movieId` : `undefined`
  );

  const similarTvMatch = useRouteMatch<{ tvId: string }>(
    !search ? `/tv/:tvId` : `undefined`
  );

  const locationTv = {
    params: {
      tvId: new URLSearchParams(location.search).get("tv"),
    },
  };
  // console.log(locationTv);
  const locationMovie = {
    params: {
      movieId: new URLSearchParams(location.search).get("movies"),
    },
  };

  const similarMatch = similarMovieMatch ? similarMovieMatch : similarTvMatch;

  const detailData = useQuery<IGetVideoDetail>(["videos", "detail"], () =>
    getVideoDetail(isWhat, isSearch)
  );

  const clickedData = videoData.find((item) => item.id === +isSearch)
    ? videoData.find((item) => item.id === +isSearch)
    : detailData.data;
  // console.log(clickedData);
  const mouseEnter = (event: any) => {
    setOver(true);
  };
  //console.log(similarMatch, similarMovieMatch, similarTvMatch);
  //console.log(similarMovieMatch, similarMatch);
  //console.log(similarTvMatch);
  //console.log(data, isLoading);
  //console.log(detailData.data);
  //console.log(similarData.data?.results[0]);
  //console.log(bigVideoMatch=params.movieId);
  const onBoxClicked = (id: number) => {
    setOver(false);
    setClicked(true);
    if (!search) {
      if (isWhat === "movie") {
        history.push(`/movies/${id}`);
      } else if (isWhat === "tv") {
        history.push(`/tv/${id}`);
      }
    } else if (search) {
      if (isWhat === "movie") {
        history.push(`${location.pathname}?$keyword=${keyword}&movies=${id}`);
      } else if (isWhat === "tv") {
        history.push(`${location.pathname}?$keyword=${keyword}&tv=${id}`);
      }
    }
  };
  //console.log(moreMovie);
  //console.log(clickedData?.poster_path);
  //console.log(clickedData);
  // console.log("무비ㅏ아이디임", movieId);
  // console.log(
  //   "시밀러 데이터 :",
  //   similarData.data?.results,
  //   "클릭임:",
  //   clicked,
  //   "시밀러맷치",
  //   similarMatch
  // );
  //console.log(clickedData);
  return (
    <>
      {detailData.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <AnimatePresence>
            {clickedData && (
              <Overlay
                key={clickedData.id + "az1"}
                onClick={onOverlayClicked}
                exit={{ opacity: 0, zIndex: 0 }}
                animate={{ opacity: 1, zIndex: 2 }}
              ></Overlay>
            )}
            {clickedData && (
              <BigMovie
                key={clickedData.id + "az2"}
                variants={opacityV}
                initial="entry"
                animate="normal"
                exit="exit"
                transition={{ delay: 0.3, duration: 0.5, type: "tween" }}
                style={{ top: scrollY.get() + 100, zIndex: 4 }}
                layoutId={isSearch}
              >
                <>
                  {detailData.data?.videos?.results[0] ? (
                    <BigCover
                      key={clickedData.id + "az3"}
                      onMouseEnter={mouseEnter}
                      src={
                        over
                          ? `https://www.youtube.com/embed/${detailData.data?.videos?.results[0]?.key}?autoplay=1&mute=0&controls=0&loop=1&start=10&playlist=${detailData.data?.videos?.results[0]?.key}&cc_lang_pref=ko&cc_load_policy=1&modestbranding=1`
                          : ""
                      }
                      allow="autoplay"
                      frameBorder={0}
                      userWidth={window.innerWidth}
                      bgPhoto={makeImageHelper(
                        clickedData.backdrop_path
                          ? clickedData.backdrop_path
                          : clickedData.poster_path
                          ? clickedData.poster_path
                          : ""
                      )}
                    ></BigCover>
                  ) : (
                    <BigCover
                      key={clickedData.id + "az4"}
                      userWidth={window.innerWidth}
                      bgPhoto={makeImageHelper(
                        clickedData.backdrop_path
                          ? clickedData.backdrop_path
                          : clickedData.poster_path
                          ? clickedData.poster_path
                          : ""
                      )}
                    ></BigCover>
                  )}
                  <DisableCover
                    key={clickedData.id + "az5"}
                    isOver={over}
                  ></DisableCover>
                  <BigContainer key={clickedData.id + "az6"}>
                    <BigTitle key={clickedData.id + "az7"}>
                      {isWhat === "movie"
                        ? clickedData.title
                        : clickedData.name}
                    </BigTitle>
                    <UserBox key={clickedData.id + "az8"}>
                      <Playbox key={clickedData.id + "az9"}>
                        <i
                          key={clickedData.id + "a10"}
                          className="fas fa-play"
                        ></i>
                        <span key={clickedData.id + "az11"}> 재생</span>
                      </Playbox>
                      <PlayCircle key={clickedData.id + "az12"}>
                        <i
                          key={clickedData.id + "az13"}
                          className="fas fa-plus"
                        ></i>
                      </PlayCircle>
                      <PlayCircle key={clickedData.id + "az14"}>
                        <i
                          key={clickedData.id + "az15"}
                          className="far fa-thumbs-up"
                        ></i>
                      </PlayCircle>
                      <PlayCircle key={clickedData.id + "az16"}>
                        <i
                          key={clickedData.id + "az17"}
                          className="far fa-thumbs-down"
                        ></i>
                      </PlayCircle>
                    </UserBox>
                    <DetailGrid key={clickedData.id + "az18"}>
                      <DetailBox key={clickedData.id + "az19"}>
                        <InfoBox key={clickedData.id + "az20"}>
                          <MoiveAverage key={clickedData.id + "az21"}>
                            {clickedData.vote_average
                              ? `${(clickedData.vote_average * 10).toFixed(
                                  0
                                )}% 일치`
                              : ""}
                          </MoiveAverage>
                          <MovieInfoTop key={clickedData.id + "az22"}>
                            {isWhat === "movie" && clickedData?.release_date
                              ? clickedData?.release_date.slice(0, 4)
                              : clickedData.first_air_date?.slice(0, 4)}
                            년
                          </MovieInfoTop>
                          <MovieInfoTop key={clickedData.id + "az23"}>
                            {detailData.data?.runtime === 0 ||
                            detailData.data?.runtime === null ||
                            detailData.data?.runtime === undefined
                              ? ""
                              : `${detailData.data?.runtime}분`}
                          </MovieInfoTop>
                        </InfoBox>
                        <BigOverview key={clickedData.id + "az24"}>
                          {clickedData.overview}
                        </BigOverview>
                      </DetailBox>
                      {detailData.data?.genres &&
                        creditData.data?.crew &&
                        creditData.data?.cast && (
                          <DetailBox key={clickedData.id + "az25"}>
                            <InfoBox key={clickedData.id + "az26"}>
                              <InfoSpan key={clickedData.id + "az27"}>
                                장르:
                              </InfoSpan>
                              {detailData.data?.genres?.map((item: any) => (
                                <MovieInfo key={item.id}>
                                  {item.name},
                                </MovieInfo>
                              ))}
                            </InfoBox>

                            <InfoBox key={clickedData.id + "az28"}>
                              <InfoSpan key={clickedData.id + "az29"}>
                                출연진:
                              </InfoSpan>
                              <MovieInfo key={clickedData.id + "az30"}>
                                {creditData.data?.cast[0]
                                  ? `${creditData.data?.cast[0].name},`
                                  : ""}
                              </MovieInfo>
                              <MovieInfo key={clickedData.id + "az31"}>
                                {creditData.data?.cast[1]
                                  ? `${creditData.data?.cast[1].name},`
                                  : ""}
                              </MovieInfo>
                              <MovieInfo key={clickedData.id + "az32"}>
                                {creditData.data?.cast[2]
                                  ? `${creditData.data?.cast[2].name}`
                                  : ""}
                              </MovieInfo>
                            </InfoBox>
                            <InfoBox key={clickedData.id + "az33"}>
                              <InfoSpan key={clickedData.id + "az34"}>
                                크리에이터:
                              </InfoSpan>
                              <MovieInfo key={clickedData.id + "az35"}>
                                {creditData.data?.crew[0]
                                  ? `${creditData.data?.crew[0].name},`
                                  : ""}
                              </MovieInfo>
                              <MovieInfo key={clickedData.id + "az36"}>
                                {creditData.data?.crew[1]
                                  ? `${creditData.data?.crew[1].name},`
                                  : ""}
                              </MovieInfo>
                              <MovieInfo key={clickedData.id + "az37"}>
                                {creditData.data?.crew[2]
                                  ? `${creditData.data?.crew[2].name}`
                                  : ""}
                              </MovieInfo>
                            </InfoBox>
                          </DetailBox>
                        )}
                    </DetailGrid>
                    {similarData?.data?.results && (
                      <MoreBox key={clickedData.id + "az38"}>
                        {similarData.data?.results[9] &&
                          Array.from({ length: 9 }, (v, i) => i).map((item) => (
                            <MoreMovie
                              key={similarData?.data?.results[item].id + "1as1"}
                              onClick={() =>
                                onBoxClicked(
                                  similarData?.data
                                    ? similarData?.data?.results[item].id
                                    : 0
                                )
                              }
                            >
                              {(similarMatch || search) &&
                                similarData.data?.results && (
                                  <MoreCover
                                    key={
                                      similarData?.data?.results[item].id +
                                      "1as2"
                                    }
                                    bgPhoto={makeImageHelper(
                                      similarData.data?.results[item]
                                        ?.backdrop_path
                                        ? similarData.data?.results[item]
                                            ?.backdrop_path
                                        : similarData.data.results[item]
                                            .poster_path
                                    )}
                                  ></MoreCover>
                                )}
                              <MoreInfoBox
                                key={
                                  similarData?.data?.results[item].id + "1as3"
                                }
                              >
                                <MoreTitle
                                  key={
                                    similarData?.data?.results[item].id + "1as4"
                                  }
                                >
                                  {isWhat === "movie"
                                    ? similarData.data?.results[item].title
                                    : similarData.data?.results[item].name}
                                </MoreTitle>
                                <MoiveAverage
                                  key={
                                    similarData?.data?.results[item].id + "1as5"
                                  }
                                >
                                  {similarData.data?.results[item].vote_average
                                    ? `${(
                                        similarData.data?.results[item]
                                          .vote_average * 10
                                      ).toFixed(0)}%일치`
                                    : ""}
                                </MoiveAverage>
                                <MoreInfo
                                  key={
                                    similarData?.data?.results[item].id + "1as6"
                                  }
                                ></MoreInfo>
                                {similarData.data?.results[item].overview && (
                                  <MoreInfo
                                    key={
                                      similarData?.data?.results[item].id +
                                      "1as7"
                                    }
                                  >
                                    {similarData.data?.results[item].overview
                                      .length > 200
                                      ? `${similarData.data?.results[
                                          item
                                        ].overview.slice(0, 200)}...`
                                      : similarData.data?.results[item]
                                          .overview}
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
            )
          </AnimatePresence>
          <>
            {similarData.data?.results &&
              clicked &&
              (similarMovieMatch ||
              (locationMovie?.params?.movieId
                ? locationMovie?.params?.movieId?.length >= 1
                : false) ? (
                <ClickMovie
                  key={clickedData?.id + "az40"}
                  bigVideoMatch={
                    similarMovieMatch ? similarMovieMatch : locationMovie
                  }
                  videoData={similarData.data?.results}
                  isWhat={"movie"}
                  search={search}
                />
              ) : (
                similarData.data?.results &&
                clicked &&
                (similarTvMatch ||
                  (locationTv?.params?.tvId
                    ? locationTv?.params?.tvId?.length >= 1
                    : false)) && (
                  <ClickMovie
                    key={clickedData?.id + "az41"}
                    bigVideoMatch={similarTvMatch ? similarTvMatch : locationTv}
                    videoData={similarData.data?.results}
                    isWhat={"tv"}
                    search={search}
                  />
                )
              ))}
          </>
          )
        </>
      )}
    </>
  );
}

export default ClickMovie;
