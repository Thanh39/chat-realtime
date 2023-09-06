import { ReactNode, useRef } from 'react';
import { IconifyIcon } from '@iconify/react';
import { SnackbarProvider, SnackbarKey } from 'notistack';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, GlobalStyles, Collapse } from '@mui/material';
// hooks
// theme
//
import Iconify from './Iconify';
import { ColorSchema } from './palette';

// ----------------------------------------------------------------------

function SnackbarStyles() {
  const theme = useTheme();



  return (
    <GlobalStyles
      styles={{
        '#root': {
          '& .SnackbarContent-root': {
            width: '100%',
            padding: theme.spacing(1),
            margin: theme.spacing(0.25, 0),
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.grey[800],
            backgroundColor: theme.palette.grey[0],
            '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up('md')]: {
              minWidth: 240,
            },
          },
          '& .SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium,
          },
          '& .SnackbarItem-action': {
            marginRight: 0,
            color: theme.palette.action.active,
            '& svg': { width: 20, height: 20 },
          },
        },
      }}
    />
  );
}

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function NotistackProvider({ children }: Props) {


  const notistackRef = useRef<any>(null);

  const onClose = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        TransitionComponent={Collapse}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        // With close as default
        action={(key) => (
            <Iconify icon={'eva:close-fill'} />
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}


