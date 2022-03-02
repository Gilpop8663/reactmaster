import styled from 'styled-components';

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
  &:hover {
  }

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
        <Icon
          href="https://github.com/Gilpop8663"
          target="_blank"
          title="깃 허브"
        >
          <i className="fab fa-github" />
        </Icon>
        <Icon
          href="https://hell-of-company-builder.tistory.com/"
          target="_blank"
          title="블로그"
        >
          <i className="fas fa-feather-alt" />
        </Icon>
        <Icon title="노마드코더" href="https://nomadcoders.co/" target="_blank">
          <NomarImg
            src="https://nomadcoders.co/m.svg"
            alt=""
            aria-labelledby="노마드코더"
            aria-required="true"
          />
        </Icon>
      </Icons>
    </Wrapper>
  );
}

export default Footer;
