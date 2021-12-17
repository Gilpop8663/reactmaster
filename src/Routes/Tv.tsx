import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvOnAir, IOnAirData } from "../api";
import NowMovies from "../Components/NowMovies";
import TvSlider from "../Components/TvSlider";

const Wrapper = styled.div``;
function Tv() {
  const onAirData = useQuery<IOnAirData>(["Tv", "onAir"], getTvOnAir);
  // console.log(onAirData.data);
  return (
    <Wrapper>
      {onAirData.data && (
        <TvSlider
          movieData={onAirData.data?.results}
          page1={onAirData.data}
          sliderTitle="지금 방송중인 TV 쇼"
        />
      )}
    </Wrapper>
  );
}

export default Tv;
