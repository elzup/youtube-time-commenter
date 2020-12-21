import { createMuiTheme } from '@material-ui/core/styles'

export const layout = {
  header: {
    height: '52px',
  },
  icon: {
    default: '#aaa',
    selected: '#074dff',
  },
}

export const theme = createMuiTheme({
  props: {
    MuiButton: {
      variant: 'contained',
    },
    MuiTextField: {
      variant: 'outlined',
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        margin: '4px',
      },
    },
    MuiButton: {
      root: {
        margin: '4px',
      },
    },
  },
})
