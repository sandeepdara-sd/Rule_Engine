import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import { createRule } from '../api/api';
import CloseIcon from '@mui/icons-material/Close';
import './CreateRule.css';

const CreateRule = () => {
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [message, setMessage] = useState('');
  const [formattedAST, setFormattedAST] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRule({ ruleName, ruleString });
      console.log(response.data);
      setMessage(`Rule created: ${response.data.ruleName}`);
      setSeverity('success');
      const astString = formatAST(response.data.ruleAST);
      setFormattedAST(astString);
    } catch (error) {
      setMessage(`Error: ${error.response.data.error || 'An unexpected error occurred.'}`);
      setSeverity('error');
      setFormattedAST('');
    }
    setSnackbarOpen(true);
  };

  const formatAST = (node, indent = '', isLeft = true) => {
    if (!node) return '';

    let result = '';
    if (node.right) {
      result += formatAST(node.right, indent + (isLeft ? "│   " : "    "), false);
    }

    const nodeStyle = node.type === 'operator' ? 'operator' : 'condition';
    result += `${indent}${isLeft ? "└── " : "┌── "}<span class="${nodeStyle}">${node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`}</span>\n`;

    if (node.left) {
      result += formatAST(node.left, indent + (isLeft ? "    " : "│   "), true);
    }

    return result;
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" className="container">
      <Paper elevation={6} className="paper">
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
          Create Rule
        </Typography>
        <form onSubmit={handleSubmit} className="form">
          <TextField
            label="Rule Name"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            className="input"
            InputLabelProps={{ className: 'label' }}
            InputProps={{ className: 'input-field' }}
          />
          <TextField
            label="Rule String"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            className="input"
            InputLabelProps={{ className: 'label' }}
            InputProps={{ className: 'input-field' }}
          /><br/>
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              borderRadius: 20,
              padding: '10px 20px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: '#115293',
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            Create Rule
          </Button>
        </form>
        {formattedAST && (
          <>
            <Typography variant="h6" gutterBottom align="center" className="ast-title">Rule AST:</Typography>
            <pre className="ast-output">
              <code dangerouslySetInnerHTML={{ __html: formattedAST }} />
            </pre>
          </>
        )}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateRule;
