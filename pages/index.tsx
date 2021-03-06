import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '../src/components/Link'

export default function Index() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Next.js v5-beta with TypeScript example
        </Typography>
      </Box>
      <Link href='/about'>aboot</Link>
      <br />
      <Link href='/blog'>bloooger</Link>
    </Container>
  )
}
