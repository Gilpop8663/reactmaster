import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getTvOnAir, IGetVideosProps } from "../api";
import NowMovies from "../Components/NowMovies";

const Wrapper = styled.div`
  padding-top: 500px;
`;
function Tv() {
  const location = useLocation();
  const onAirData = useQuery<IGetVideosProps>(["Tv", "onAir"], getTvOnAir);
  // console.log(onAirData.data);
  return (
    <Wrapper>
      {onAirData.data && (
        <NowMovies
          isWhat="tv"
          videoData={onAirData.data?.results}
          search={location.search ? location.search : ""}
          sliderTitle="지금 방송중인 TV 쇼"
        />
      )}
    </Wrapper>
  );
}

export default Tv;
