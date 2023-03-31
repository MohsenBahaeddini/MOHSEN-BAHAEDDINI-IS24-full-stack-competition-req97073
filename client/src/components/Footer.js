import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <FooterWrapper>
      <ContentWrapper>
        <Logo>
          <StyledNavLink exact to="/">
            BC IMB
          </StyledNavLink>
        </Logo>
      </ContentWrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  background-color: #003366;
  border-top: 2px solid #fcba19;
  min-height: 80px;
  width: 100%;
  @media only screen and (max-width: 1024px) {
    padding-left: 60px;
    padding-right: 60px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1920px;
  margin: 0 auto;
  height: 100%;
  align-items: center;
`;

const Logo = styled.h1`
  padding-left: 100px;

  @media only screen and (max-width: 1024px) {
    padding-left: 0;
  }
`;
const StyledNavLink = styled(NavLink)`
  color: antiquewhite;
  font-size: 20px;
  text-decoration: none;
  &:hover {
    color: lightblue;
  }

  @media only screen and (max-width: 620px) {
    font-size: 22px;
  }
`;

export default Footer;
