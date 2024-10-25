import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/rules', 
});

// Function to create a rule
export const createRule = async (ruleData) => {
  return await api.post('/create_rule', ruleData);
};

export const combineRules = async (rules, op) => {
  return await api.post('/combine_rules', { rules, op });
};

export const evaluateRule = async (ast, data) => {
  return await api.post('/evaluate_rule', { ast, data });
};

export default api;
