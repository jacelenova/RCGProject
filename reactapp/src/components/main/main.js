import { Grid, Typography } from "@mui/material"
import { Encode } from '../encode/encode';
import { Flex } from "../flex/flex";

export const Main = () => {
  return (
    <Grid container direction="column" alignItems="center" justifyContent="space-around" sx={{height: '100%'}}>
      <Flex sx={{alignItems: 'flex-end', mb: 4, mt: 4}}>
        <Typography variant="h2">Coding Test</Typography>
      </Flex>
      <Flex sx={{flexGrow:'6', minWidth: '300px'}}>
        <Encode></Encode>
      </Flex>
    </Grid>
  )
}