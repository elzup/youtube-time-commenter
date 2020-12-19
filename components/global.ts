import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle<{ padding?: string }>`
html,
body {
  height: 100%;
  margin: 0;
}
`

export default GlobalStyle
