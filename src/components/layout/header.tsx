import * as React from 'react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { ColorModeSwitch } from '../colorModeSwitch'

export const Header = () => {
  const router = useRouter()
  console.log('router', router)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, ml: 1 }}>
            News
          </Typography>
          <MobileNav />
          <ColorModeSwitch />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const MobileNav = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <IconButton
        aria-label='Menu'
        disableRipple
        onClick={() => setOpen((prevState) => !prevState)}
        sx={{
          mr: 1,
          position: 'relative',
          p: '6.5px',
          borderRadius: 2,
          border: '1px solid',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.800' : 'transparent',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200',
          '& svg': { width: 18, height: 18 },
          '&:focus': {
            boxShadow: (theme) =>
              `0 0 0 1px ${
                theme.palette.mode === 'dark'
                  ? theme.palette.grey[600]
                  : theme.palette.grey[200]
              }`,
          },
          '& rect': {
            transformOrigin: 'center',
            transition: '0.2s',
          },
          ...((open as any) && {
            '& rect:first-of-type': {
              transform: 'translate(1.5px, 1.6px) rotateZ(-45deg)',
            },
            '& rect:last-of-type': {
              transform: 'translate(1.5px, -1.2px) rotateZ(45deg)',
            },
          }),
        }}
      >
        <MenuIcon sx={{ color: (theme) => theme.palette.common.white }} />
      </IconButton>
    </>
  )
}
