function parseRuleString(ruleString) {
  const tokens = ruleString.match(/(\(|\)|AND|OR|<=|>=|!=|<|>|=|[^()\s]+)/g);
  const stack = [];
  const operators = [];

  function popOperator() {
      const operator = operators.pop();
      const right = stack.pop();
      const left = stack.pop();
      
      stack.push({ type: 'operator', operator, left, right });
  }

  for (let i = 0; i < tokens.length; i++) {
      
      const token = tokens[i].trim();
      if (token === ' ') continue; 

      if (token === 'AND' || token === 'OR') {
          while (operators.length && operators[operators.length - 1] !== '(') {
              popOperator();
          }
          operators.push(token);
      } else if (token === '(') {
          operators.push(token);
      } else if (token === ')') {
          while (operators.length && operators[operators.length - 1] !== '(') {
              popOperator();
          }
          operators.pop();
      } else {
          
          let key=null,operator=null,value=null;
          while(i<tokens.length && (key==null||operator==null||value==null) ){
            if(key===null) key=tokens[i];
            else if(operator==null) operator=tokens[i];
            else value=tokens[i];
            i++;
          }
          i--;
          
          stack.push({ type: 'operand', key, operator, value });
      }
  }

  while (operators.length) {
      popOperator();
  }

  return stack[0];
}



function printTree(node, indent = '', isLeft = true) {
if (!node) return;

if (node.right) {
    printTree(node.right, indent + (isLeft ? "│   " : "    "), false);
}

console.log(indent + (isLeft ? "└── " : "┌── ") + (node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`));

if (node.left) {
    printTree(node.left, indent + (isLeft ? "    " : "│   "), true);
}
}


function combineNodes(rules,op) {
  if (rules.length === 1) return rules[0];

  let combined = rules[0];
  for (let i = 1; i < rules.length; i++) {
      combined = { type: 'operator', operator: op, left: combined, right: rules[i] };
  }

  return combined;
}

function evaluate(node, data) {
  if (node.type === 'operator') {
    const left = evaluate(node.left, data);
    const right = evaluate(node.right, data);
    if (node.operator === 'AND') {
      return left && right;
    } else if (node.operator === 'OR') {
      return left || right;
    }
  } else if (node.type === 'operand') {
    let { key, operator, value } = node;
    if (typeof value === 'string'){
      if (value[0] === "'" && value[value.length - 1] === "'") {
        value = value.slice(1, value.length - 1);
      }
    }
  
    switch (operator) {
      case '>':
        return data[key] > value;
      case '<':
        return data[key] < value;
      case '>=':
        return data[key] >= value;
      case '<=':
        return data[key] <= value;
      case '==':
        return data[key] == value;
      case '!=':
        return data[key] != value;
      case '=': 
        return data[key] == value;
      default:
        return false;
    }
  }
  return false;
}

module.exports = { parseRuleString, combineNodes, evaluate, printTree };    