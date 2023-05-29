import { createGlobalStyle } from 'styled-components';
import { FONTS } from '../constants/fonts';
import { COLORS } from '../constants/styles';

const GlobalStyles = createGlobalStyle`

*,
*::after,
*::before {
    box-sizing: border-box;
    outline: 1px dashed rgba(255 0 0 / 0.3);
}

html {
  width: 100vw;
  overflow-x: hidden;
}

#root {
  min-height: 100vh;
}

body {
    margin: 0;
    background-color: ${COLORS.gray200};
    font-family: ${FONTS.sans};
    font-weight: 400;
}

main {    
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

h1, h2, h3, h4 {
    margin-top: 0
}
`;

export { GlobalStyles };
