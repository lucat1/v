import { h, FunctionComponent } from "preact";
import { styled } from "goober";

const H = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 1125px;
  margin: 3rem auto 11rem;
`;

const Image = styled("img")`
  height: 2rem;
`;

const Header: FunctionComponent = () => {
  return (
    <H>
      <Image src="/webpack.svg" />
      <span>menu</span>
    </H>
  );
};

export default Header;
