import { createGlobalStyle } from 'styled-components';
import { FONTS } from '../constants/fonts';
import { COLORS } from '../constants/styles';

const GlobalStyles = createGlobalStyle`

*,
*::after,
*::before {
  box-sizing: border-box;
  // outline: 1px dashed rgba(255 0 0 / 0.3);
}

html {
  width: 100vw;
  overflow-x: hidden;
}

body {
  margin: 0;
  background-color: ${COLORS.gray200};
  color: ${COLORS.black};
  font-family: ${FONTS.sans};
  font-weight: 400;
}

#root {
  // height: 100vh;
  min-height: 100vh;  
}

main {
  // min-height: calc(100% - 68px);
  width: min(75rem, 100% - 2rem);
  margin: 0 auto;
}

img, video {
  max-width: 100%;
  display: block;
}

ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
}

a {
    text-decoration: none;
    color: inherit;
}

button, input {
  font-family: inherit;
}

h1, h2, h3, h4 {
    margin-top: 0
}
`;

export { GlobalStyles };
