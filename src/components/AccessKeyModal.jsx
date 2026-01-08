import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { useContext } from 'react';
import { AccessContext, MyAccessProvider } from '../context/MyAccessProvider';
import { useState } from 'react';

export const AccessKeyModal = ({open,onClose,onSuccess}) => {
    const [key,setKey] = useState("")
    const {verifyKey} = useContext(AccessContext)
    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await verifyKey(key)
        if(result){
            onClose()
            onSuccess()
            setKey("")
        }else{
            alert("Hibás kulcs!")
        }
    }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose}>
        <ModalDialog>
          <DialogTitle>Titkos kulcs szukséges</DialogTitle>
          <DialogContent>Add meg a kulcsot a művelet folytatásához!</DialogContent>
          <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Key</FormLabel>
                <Input autoFocus required type='password' value={key} onChange={(e)=>setKey(e.target.value)}/>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}