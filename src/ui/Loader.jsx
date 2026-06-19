import { CircularProgress, Box } from '@mui/material'

export default function Loader() {
  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Box>
  )
}
