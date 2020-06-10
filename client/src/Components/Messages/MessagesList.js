import React, { Fragment, useState } from 'react';
import { isEmpty } from 'lodash';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';

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

const CenteredTypography = withStyles((theme) => ({
  root: {
    alignSelf: "center"
  }
}))(Typography);

const MessagesList = props => {
  const { messages, handleDelete } = props;
  const [expanded, setExpanded] = useState('');

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
                <CenteredTypography>{`From: ${message.sender}             Subject: ${message.subject}            ${dateService.dateFormating(message.creationDate)}`}</CenteredTypography>
                <IconButton onClick={() => { handleDelete(message._id, messages) }}>
                  <DeleteIcon />
                </IconButton>
              </Fragment>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{`Message: ${message.message}`}</Typography>
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
