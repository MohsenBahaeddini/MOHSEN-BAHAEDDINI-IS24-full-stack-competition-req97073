import styled from "styled-components";

// Header component
const Header = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Logo src="/assets/Logo.jpg" alt="BC Logo" />
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

export default Header;
