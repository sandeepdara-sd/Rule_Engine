import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close'; // Close icon for Snackbar
import './CombineRules.css'; // External CSS for better structure

const CombineRules = () => {
  const [rules, setRules] = useState(['']); // Initialize with one empty rule
  const [operator, setOperator] = useState('AND');
  const [message, setMessage] = useState('');
  const [astTree, setAstTree] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRuleChange = (index, value) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const handleAddRule = () => {
    setRules([...rules, '']);
  };

  const handleRemoveRule = (index) => {
    
    if (index === 0) {
      return;
    }
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = { rules, op: operator };
      const response = await axios.post('http://localhost:8000/api/rules/combine_rules', requestData);
      if (response && response.data) {
        setMessage(`Combined Rule created: ${response.data.ruleName}`);
        setAstTree(response.data.ruleAST);
        setSnackbarOpen(true);
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.error || error.response.statusText}`);
      } else {
        setMessage(`Error: ${error.message}`);
      }
      setSnackbarOpen(true);
    }
  };

  const renderTree = (node, indent = '', isLeft = true) => {
    if (!node) return null;

    let result = '';
    if (node.right) {
      result += renderTree(node.right, indent + (isLeft ? '│   ' : '    '), false);
    }

    const nodeClass = node.type === 'operator' ? 'operator' : 'condition';
    result += `${indent}${isLeft ? '└── ' : '┌── '}<span class="${nodeClass}">${node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`}</span>\n`;

    if (node.left) {
      result += renderTree(node.left, indent + (isLeft ? '    ' : '│   '), true);
    }
    return result;
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" className="combine-container">
      <Paper elevation={5} className="combine-paper">
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
                    Combine Rules
                </Typography>
        <form onSubmit={handleSubmit} className="combine-form">
          {rules.map((rule, index) => (
            <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  label={`Rule ${index + 1}`}
                  value={rule}
                  onChange={(e) => handleRuleChange(index, e.target.value)}
                  required
                  fullWidth
                  className="combine-input"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} className="operator-select">
                {index === 0 && (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel sx={{ padding: '0 8px', marginTop:-1.5 }}>Operator</InputLabel> 
                    <Select
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                      required
                      className="combine-select"
                      sx={{ mt: 1,marginTop:'-0.2' }} 
                    >
                      <MenuItem value="AND">AND</MenuItem>
                      <MenuItem value="OR">OR</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} md={1}>
                {index > 0 && ( 
                  <IconButton color="secondary" onClick={() => handleRemoveRule(index)}>
                    <CloseIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={handleAddRule} className="add-button">
                Add Another Rule
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit"
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
                                }}>
                Combine Rules
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={message.includes('Error') ? 'error' : 'success'}
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
        {astTree && (
          <div className="ast-container">
            <Typography variant="h6" align="center" className="ast-title">Resulting AST:</Typography>
            <pre className="ast-output">
              <code dangerouslySetInnerHTML={{ __html: renderTree(astTree) }} />
            </pre>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default CombineRules;
