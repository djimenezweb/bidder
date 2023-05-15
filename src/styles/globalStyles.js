import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

*,
*::after,
*::before {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: 'Manrope', sans-serif;
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
`;

export { GlobalStyles };
