import * as React from 'react'
import { Header } from '../layout/header'
import { Container } from '@mui/material'

interface ILayoutProps {
  children?: JSX.Element[]
  title: string
  [x: string]: any
}

export const Layout: React.FC<ILayoutProps> = ({ children, title }) => {
  return (
    <>
      <Header title={title} />
      <Container>{children}</Container>
    </>
  )
}
