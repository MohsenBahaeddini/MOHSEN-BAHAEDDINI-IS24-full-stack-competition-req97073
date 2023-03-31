import styled from "styled-components";

import ProductsList from "./ProductsList";

const Home = () => {
  return (
    <Container>
      <ProductsList />
    </Container>
  );
};
const Container = styled.div`
  max-width: 1920px;
  margin: auto;
`;
export default Home;
