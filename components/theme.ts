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
      variant: 'outlined',
    },
  },
  overrides: {
    MuiCardHeader: {
      title: {
        fontSize: '16px',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
    MuiRadio: {
      root: {
        margin: 0,
        padding: 0,
      },
    },
    MuiFormLabel: {
      filled: {
        transform: 'translate(0, 1.5px) scale(1) !important',
      },
    },
  },
})
