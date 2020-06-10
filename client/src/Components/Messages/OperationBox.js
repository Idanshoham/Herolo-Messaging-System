import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';
import InboxIcon from '@material-ui/icons/Inbox';
import AddIcon from '@material-ui/icons/Add';

import NewMessage from './NewMessage';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    marginBottom: theme.spacing(1),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  main: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const OperationBox = props => {
  const classes = useStyles();
  const { isDrawerOpen, isInbox, handleAddition, handleMessagesShown } = props;
  const [selectedIndex, setSelectedIndex] = useState(isInbox ? 'inbox' : 'sent');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (added = false) => {
    setOpen(false);
    if (added)
      handleAddition();
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleMessagesShown(isInbox);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
      { isDrawerOpen &&
        <Grid container justify="center" className={classes.grid}>
          <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />} onClick={handleOpen}> 
            New Message
          </Button>
          <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <NewMessage classes={classes} inbox={isInbox} handleClose={handleClose}/>
              </div>
            </Fade>
          </Modal>
        </Grid>
      }
        <Divider />
        <ListItem button selected={selectedIndex === 'inbox'} onClick={(event) => handleListItemClick(event, 'inbox')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button selected={selectedIndex === 'sent'} onClick={(event) => handleListItemClick(event, 'sent')}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Messages Sent" />
        </ListItem>
      </List>
    </div>
  );
}

export default OperationBox;
