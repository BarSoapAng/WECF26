import styled from "styled-components"
import { colors, Header1 } from "../lib/styles"

const Background = styled.footer`
  width: 100%;
  background-color: ${colors.background.orange};
`;

function Footer() {
  return (
    <Background>
      <Header1>
        FOOTER TEXT HERE
      </Header1>
    </Background>
  )
}

export default Footer
