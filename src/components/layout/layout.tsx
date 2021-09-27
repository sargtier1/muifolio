import * as React from 'react'
import { Header } from '../layout/header'
import { Container } from '@mui/material'

interface ILayoutProps {
  children?: JSX.Element[]
  [x: string]: any
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  )
}
