import * as React from 'react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { ColorModeSwitch } from '../colorModeSwitch'
import Link from '../Link'
import { ClickAwayListener, Collapse } from '@mui/material'

interface IHeaderProps {
  title: string
}

export const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h5'
            component='div'
            sx={{
              fontSize: '1.5rem',
              flexGrow: 1,
              ml: 1,
              fontWeight: 'bold',
              letterSpacing: '-.1rem',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
            <DesktopNav />
          </Box>
          <Box sx={{ display: { md: 'none' }, mr: 1 }}>
            <MobileNav />
          </Box>
          <ColorModeSwitch />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const DesktopNav = () => {
  return (
    <Stack direction='row' spacing={2} sx={{ mr: 2 }}>
      {links.map((l, i) => (
        <Link
          key={i}
          href={l.path}
          sx={{
            color: 'white',
          }}
        >
          {l.label}
        </Link>
      ))}
    </Stack>
  )
}

const MobileNav = () => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    const handleRouteChangeComplete = (err: any, url: string) => {
      if (err?.cancelled) {
        console.log(`Route to ${url} was cancelled!`)
      }
      setOpen(false)
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

  return (
    <>
      <IconButton
        aria-label='Menu'
        disableRipple
        size='large'
        onClick={() => setOpen((prevState) => !prevState)}
        ref={menuRef}
        sx={{
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
      <ClickAwayListener
        onClickAway={(event) => {
          if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
          ) {
            setOpen(false)
          }
        }}
      >
        <Collapse
          in={open}
          sx={{
            position: 'fixed',
            top: 65,
            left: 0,
            right: 0,
            boxShadow: '0 15px 10px -5px rgb(90 105 120 / 10%)',
            bgcolor: 'background.paper',
            zIndex: 'appBar',
          }}
        >
          <Box
            sx={{
              p: 2.5,
              bgcolor: 'background.paper',
              maxHeight: 'calc(100vh - 56px)',
              overflow: 'auto',
            }}
          >
            <Stack>
              {links.map((l, i) => (
                <Link key={i} href={l.path}>
                  {l.label}
                </Link>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </ClickAwayListener>
    </>
  )
}

const links = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Blog',
    path: '/blog',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
]
