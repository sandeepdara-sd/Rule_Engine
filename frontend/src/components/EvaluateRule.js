import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Snackbar,
    Alert,
    Paper,
    Grid,
    Box,
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const EvaluateRule = () => {
    const [ruleName, setRuleName] = useState(''); 
    const [data, setData] = useState(''); 
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                ast: ruleName, 
                data: JSON.parse(data), 
            };

            console.log('Request Data: ', requestData); 

            const response = await axios.post('http://localhost:8000/api/rules/evaluate_rule', requestData); 
            
            console.log('API Response: ', response);

            if (response && response.data) {
                setMessage('Evaluation successful!');
                setResult(response.data.result); 
            } else {
                setMessage('No data returned from the API.');
            }
        } catch (error) {
            console.error('Error details: ', error); 
            if (error.response) {
                setMessage(`Error: ${error.response.data.error || error.response.statusText}`);
            } else {
                setMessage(`Error: ${error.message}`);
            }
        } finally {
            setSnackbarOpen(true); 
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={8} sx={{ padding: 4, borderRadius: 2, backgroundColor: '#fff', boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
                    Evaluate Rule
                </Typography>
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Rule Name"
                                value={ruleName}
                                onChange={(e) => setRuleName(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="JSON Data"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                variant="outlined"
                                helperText="Enter the data in JSON format"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                                Evaluate Rule
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
                            <Button size="small" color="inherit" onClick={handleCloseSnackbar}>
                                <CloseIcon fontSize="small" />
                            </Button>
                        }
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>

                {result !== null && (
                    <Box sx={{ marginTop: '20px', backgroundColor: '#e7f3fe', padding: '15px', borderRadius: '5px', boxShadow: 2 }}>
                        <Typography variant="h6" sx={{ color: '#0c4a6e', fontWeight: 'bold' }}>Evaluation Result:</Typography>
                        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflowX: 'auto', border: '1px solid #1976d2' }}>
                            {JSON.stringify(result, null, 2)} 
                        </pre>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default EvaluateRule;
