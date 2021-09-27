import * as React from 'react'
import { IconButton, useTheme } from '@mui/material'
import { ColorModeContext } from '../../pages/_app'
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'

export const ColorModeSwitch = ({ ...rest }) => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <>
      <IconButton
        {...rest}
        disableRipple
        size='large'
        aria-label='Change Color Mode'
        onClick={colorMode.toggleColorMode}
        sx={{
          color: (theme) => theme.palette.common.white,
          borderRadius: 2,
          p: '6.5px',
          border: '1px solid',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.800' : 'transparent',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200',
          '& svg': {
            fontSize: (theme) => theme.typography.pxToRem(18),
          },
        }}
      >
        {theme.palette.mode === 'dark' ? (
          <LightModeOutlined />
        ) : (
          <DarkModeOutlined />
        )}
      </IconButton>
    </>
  )
}
