import React, { Fragment, useState } from 'react';
import { isEmpty } from 'lodash';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

import NewMessage from './NewMessage';
import * as dateService from '../../Services/dateService';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    width: '100%',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    width: '100%',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
}))(MuiExpansionPanelDetails);

const CenteredContentTypography = withStyles((theme) => ({
  root: {
    alignSelf: 'center',
  },
}))(Typography);

const useStyles = makeStyles((theme) => ({
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
}));

const MessagesList = props => {
  const classes = useStyles();
  const { messages, isInbox, handleAddition, handleDelete } = props;
  const [expanded, setExpanded] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (added = false) => {
    setOpen(false);
    if (added)
      handleAddition();
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (!isEmpty(messages)) {
    return (
      messages.map((message, index) => {
        return (
          <ExpansionPanel square display="grid" expanded={expanded === `panel${index}`} onChange={handleChange('panel'+index)} key={index}>
            <ExpansionPanelSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
              <Fragment>
                <Typography style={{ marginRight: 'auto'}}>{`From: ${message.sender}`} <br /> {`To: ${message.receiver}`}</Typography>
                <CenteredContentTypography style={{ marginRight: 'auto'}}>{message.subject}</CenteredContentTypography>
                <CenteredContentTypography >{dateService.dateFormating(message.creationDate)}</CenteredContentTypography>
                <IconButton onClick={() => { handleDelete(message._id, messages) }}>
                  <DeleteIcon />
                </IconButton>
              </Fragment>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography style={{ marginRight: 'auto'}}>{message.message}</Typography>
              {isInbox && <IconButton size="small" onClick={handleOpen}>
                Reply
                <SendIcon />
              </IconButton> 
              }
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
                    <NewMessage receiver={message.sender} classes={classes} inbox={isInbox} handleClose={handleClose}/>
                  </div>
                </Fade>
              </Modal>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })
    );
  } else {
    return <Fragment>You have no messages at this moment</Fragment>;
  }
}

export default MessagesList;
