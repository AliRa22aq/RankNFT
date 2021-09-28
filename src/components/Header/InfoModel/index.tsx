import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SubscriptionCards from './subscriptionPlan'
import Periods from './periods'


const InfoModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">Subscription Info</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1200,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }}>
          {/* <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Your Subscription
          </Typography> */}

          <Periods />

          {/* <Typography variant="h6" component="h2">
             Update your plan
          </Typography> */}
          
          <SubscriptionCards />

        </Box>
      </Modal>
    </div>
  );
}






export default InfoModal;