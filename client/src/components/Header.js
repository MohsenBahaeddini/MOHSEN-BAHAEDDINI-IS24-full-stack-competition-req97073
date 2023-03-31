import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <StyledNavLink exact to="/">
          <Logo src="/assets/Logo.jpg" alt="BC Logo" />
        </StyledNavLink>
      </LogoWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #003366;
  height: 80px;
  border-bottom: 2px solid #fcba19;
  box-shadow: 0px 3px 10px 0px rgba(169, 169, 169, 1);
  /* z-index: 99; */
  z-index: 10;
`;

const LogoWrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;

const Logo = styled.img`
  padding: 10px 100px;
  height: 60px;
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  font-weight: bold;
  font-size: 40px;
  font-family: "Kaushan Script", "Rubik Marker Hatch";
  text-decoration: none;

  &:hover {
    color: lightblue;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 30px;
  }
`;

export default Header;
