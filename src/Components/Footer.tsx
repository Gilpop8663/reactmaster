import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 20vh;
  display: flex;
  background-color: ${(props) => props.theme.black.darker};
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Copy = styled.span`
  text-align: center;
`;

const Icons = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 5vh;
  padding-left: 45vw;
  padding-right: 45vw;
`;
const Icon = styled.a`
  display: flex;
  flex-direction: column;
  height: 30px;
  justify-content: center;
  align-content: center;
  width: 30px;
  span {
    text-align: center;
  }
  i {
    display: flex;
    justify-content: center;
    align-content: center;
  }
`;

const NomarImg = styled.img`
  height: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

function Footer() {
  return (
    <Wrapper>
      <Copy>© 2021 - Kim Young Gil, All rights reserved.</Copy>
      <Icons>
        <Icon href="https://github.com/Gilpop8663" target="_blank">
          <i className="fab fa-github"></i>
        </Icon>
        <Icon
          href="https://hell-of-company-builder.tistory.com/"
          target="_blank"
        >
          <i className="fas fa-feather-alt"></i>
        </Icon>
        <Icon href="https://nomadcoders.co/" target="_blank">
          <NomarImg src="https://nomadcoders.co/m.svg" alt="" />
        </Icon>
      </Icons>
    </Wrapper>
  );
}

export default Footer;