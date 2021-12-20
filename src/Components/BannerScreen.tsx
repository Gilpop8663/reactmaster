import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getVideoDetail,
  IGetVideoDetail,
  IGetVideosProps,
  IMovie,
} from "../api";
import { makeImageHelper } from "../utils";

const Banner = styled(motion.iframe)<{ bgPhoto: string; userWidth?: number }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled.div`
  flex-direction: column;
  top: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  padding: 60px;
`;

const Title = styled.h2`
  font-size: 64px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 34px;
  width: 80%;
`;

interface IBanner {
  videoData: IGetVideosProps;
  isWhat: string;
}

function BannerScreen({ videoData, isWhat }: IBanner) {
  const detailData = useQuery<IGetVideoDetail>(["video", "detail"], () =>
    getVideoDetail("movie", videoData.results[0].id + "")
  );
  //console.log(detailData.data?.videos.results);
  const teasearVideo = detailData.data?.videos.results.find(
    (item) => item.type === "Teaser"
  );
  console.log(teasearVideo);
  return (
    <>
      {teasearVideo ? (
        <Banner
          src={`https://www.youtube.com/embed/${teasearVideo.key}?autoplay=1&mute=0&controls=0&loop=1&start=10&playlist=${teasearVideo?.key}&cc_lang_pref=ko&cc_load_policy=1&modestbranding=1`}
          bgPhoto={makeImageHelper(
            videoData.results[0].backdrop_path
              ? videoData.results[0].backdrop_path
              : videoData.results[0].poster_path
              ? videoData.results[0].poster_path
              : ""
          )}
          frameBorder={0}
          userWidth={window.innerWidth}
          allow="autoplay"
        ></Banner>
      ) : (
        <Banner
          bgPhoto={makeImageHelper(
            videoData.results[0].backdrop_path
              ? videoData.results[0].backdrop_path
              : videoData.results[0].poster_path
              ? videoData.results[0].poster_path
              : ""
          )}
          frameBorder={0}
          userWidth={window.innerWidth}
          allow="autoplay"
        ></Banner>
      )}
      <Wrapper>
        <Title>
          {isWhat === "movie"
            ? videoData.results[0].title
            : videoData.results[0].name}
        </Title>
        <Overview>{videoData.results[0].overview}</Overview>
      </Wrapper>
    </>
  );
}

export default BannerScreen;
