import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';

import { getAllReceivedMessages, getAllSentMessages, deleteMessage } from '../../Actions/messageActions';

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

const MessagesList = props => {
  const { inbox, username, messagesReceived, messagesSent, getAllReceivedMessages, getAllSentMessages, deleteMessage } = props;
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (inbox) {
      if ((messagesReceived === undefined || !isEmpty(messagesReceived))) {
        getAllReceivedMessages({ username });
      } 
    } else {
      if ((messagesSent === undefined|| !isEmpty(messagesSent))) {
        getAllSentMessages({ username });
      } 
    }
  })

  const messages = inbox ? messagesReceived : messagesSent;
  if (!isEmpty(messages)) {
    return (
      messages.map((message, index) => {
        return (
          <ExpansionPanel square expanded={expanded === `panel${index}`} onChange={handleChange('panel'+index)} key={index}>
            <ExpansionPanelSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
              <Typography>{`Sender:${message.sender} Subject:${message.subject}`}</Typography>
              <Button startIcon={<DeleteIcon />} onClick={() => {
                deleteMessage(message._id, !inbox).then(() => {
                  if (inbox) {
                    if (!isEmpty(messagesReceived) && messages.length === messagesReceived.length) {
                      getAllReceivedMessages({ username });
                    } 
                  } else {
                    if (!isEmpty(messagesSent) && messages.length === messagesSent.length) {
                      getAllSentMessages({ username });
                    } 
                  }
                });
              }}/>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{`Message:${message.message}`}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })
    );
  } else {
    return <Fragment>You have no messages at this moment</Fragment>;
  }
}

function mapStateToProps(state) {
  return { username: state.user.user.username, messagesReceived: state.messages.messagesReceived, messagesSent: state.messages.messagesSent };
}

export default connect(mapStateToProps, { getAllReceivedMessages, getAllSentMessages, deleteMessage })(MessagesList);
