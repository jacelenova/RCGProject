import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useContext, useRef } from "react"
import { AppContext } from "../../contexts/app-context";
import { Flex } from "../flex/flex";

export const Encode = () => {
  const { encodeMessage, isEncoding, cancelEncoding, result } = useContext(AppContext);
  const messageRef = useRef();
  const cancelRef = useRef();

  const onEncodeClick = () => {
    encodeMessage(messageRef.current.value);
  }

  const cancel = () => {
    cancelEncoding();
  }

  return (
    <Flex flexDirection="column" sx={{width:'100%'}}>
      <Box sx={{width: '100%', mt: 4}}>
        <TextField
          variant="outlined"
          id="txt-message"
          type="text"
          disabled={isEncoding}
          inputRef={messageRef}
          label="Encode Text"
          fullWidth
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEncodeClick();
            }
          }}
        ></TextField>
      </Box>
      <Flex sx={{width: '100%'}}>
        {
          isEncoding ? (
            <LoadingButton loading variant="outlined" sx={{flexGrow: '1', width: '50%', mt: 2, mr: 1}}></LoadingButton>
          ) : (
            <Button variant="outlined" onClick={() => onEncodeClick()} sx={{flexGrow: '1', width: '50%', mt: 2, mr: 1}}>Encode</Button>
          )
        }
        <Button variant="outlined" ref={cancelRef} onClick={() => cancel()} sx={{flexGrow: '1', width: '50%', mt: 2, ml: 1}}>Cancel</Button>
      </Flex>
      <Box>
        <TextField multiline rows={5} variant="outlined" disabled sx={{width: '100%', mt: 2}} label='Result' value={result}></TextField>
      </Box>
    </Flex>
  )
}