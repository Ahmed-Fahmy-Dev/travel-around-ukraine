import { createTheme } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mobile: 428,
      tablet: 768,
      laptop: 1024,
      desktop: 1360,
    },
  },
});

const colors = {
  primaryMain: '#0499DD',
  secondaryMain: '#FFC700',
  textPrimary: '#282828',
  bttnBgPrimaryMain: 'linear-gradient(92.71deg, #0499DD 0%, #17C1BC 100%)',
  bttnBgPrimaryHover: 'linear-gradient(92.71deg, #0685bf 0%, #15a19d 100%)',
  bttnBgSuccessMain: 'linear-gradient(92.71deg, #1b5e20 0%, #4caf50 100%)',
  bttnBgSuccessHover: 'linear-gradient(92.71deg, #144418 0%, #3d8740 100%)',
  btntest: 'linear-gradient(92.71deg, #000 0%, #fff 100%)',
};

const appliedTheme = createTheme({
  palette: {
    primary: {
      main: colors.primaryMain,
    },
    secondary: {
      main: colors.secondaryMain,
    },
    text: {
      primary: colors.textPrimary,
    },
    success: {
      main: '#2e7d32',
      bttnBgMain: colors.bttnBgSuccessMain,
      btnBgHover: colors.bttnBgSuccessHover,
    },
  },

  breakpoints: {
    values: {
      xs: theme.breakpoints.values.xs,
      mobile: theme.breakpoints.values.mobile,
      tablet: theme.breakpoints.values.tablet,
      laptop: theme.breakpoints.values.laptop,
      desktop: theme.breakpoints.values.desktop,
    },
  },

  typography: {
    fontFamily: 'Montserrat, sans-serif',

    h2: {
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '29px',
      color: colors.primaryMain,
    },

    h3: {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '22px',
      color: colors.primaryMain,
    },

    body1: {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '17px',
      color: colors.textPrimary,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        size: 'large',
        variant: 'contained',
      },

      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.success
            ? {
                background: colors.bttnBgSuccessMain,
                '&:hover': { background: colors.bttnBgSuccessHover, color: colors.secondaryMain },
              }
            : {
                background: colors.bttnBgPrimaryMain,
                '&:hover': { background: colors.bttnBgPrimaryHover, color: colors.secondaryMain },
              }),
          padding: '16px 53px',
          borderRadius: '60px',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '17px',
          transition: '0.5s',
        }),
      },
    },

    MuiTypography: {
      defaultProps: {
        gutterBottom: true,
      },
    },

    MuiContainer: {
      defaultProps: {
        disableGutters: true,
        fixed: true,
      },

      styleOverrides: {
        root: {
          minWidth: '380px',

          [theme.breakpoints.up('xs')]: {
            padding: '0 24px',
          },

          [theme.breakpoints.up('tablet')]: {
            padding: '0 79px',
          },

          [theme.breakpoints.up('desktop')]: {
            padding: '0 80px',
          },
        },
      },
    },
  },
});

export default appliedTheme;
