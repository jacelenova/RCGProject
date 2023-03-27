import { Box } from "@mui/material"

export const Flex = ({children, sx, ...props}) => {
  return (
    <Box {...props} sx={{display: "flex", ...sx}}>{children}</Box>
  )
}