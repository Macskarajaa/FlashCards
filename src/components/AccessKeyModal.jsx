import * as React from 'react';
import ModalDialog from '@mui/joy/ModalDialog';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { MyAuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';
import Button from '@mui/joy/Button';


export const AccessKeyModal=({open, onClose, onSuccess}) => {
    const [key, setKey] = useState('');
    const {verifyKey} = useContext(MyAuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result  = await verifyKey(key);//true vagy false
        if(result){
            onSuccess();
            onClose();
        } else {
            alert("Helytelen kulcs!");
        }

    }
  return (
    <React.Fragment>
    
      <Modal open={open} onClose={onClose}>
        <ModalDialog>
          <DialogTitle>Titkos kulcs szükséges</DialogTitle>
          <DialogContent>Add meg a kulcsot a művelet folytatásához</DialogContent>
          <form onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Kulcs</FormLabel>
                <Input autoFocus required type="password" value={key} onChange={(e)=> setKey(e.target.value)} />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}