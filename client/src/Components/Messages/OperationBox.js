import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';
import InboxIcon from '@material-ui/icons/Inbox';
import AddIcon from '@material-ui/icons/Add';

import history from '../../history';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  grid: {
    marginBottom: theme.spacing(1),
  }
}));

const OperationBox = props => {
  const classes = useStyles();
  const { isDrawerOpen, isInbox, handleMessagesShown } = props;
  const [selectedIndex, setSelectedIndex] = useState(isInbox ? 'inbox' : 'sent');

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleMessagesShown(isInbox);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
      { isDrawerOpen &&
        <Grid container justify="center" className={classes.grid}>
          <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />} onClick={() => {
            history.push('/newMessage')
          }}> 
            New Message
          </Button>
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
