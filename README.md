# Rule Engine

![Rule Engine](https://img.shields.io/badge/Rule%20Engine-v1.0-brightgreen.svg)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
  - [Creating Rules](#creating-rules)
  - [Combining Rules](#combining-rules)
  - [Evaluating Rules](#evaluating-rules)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The **Rule Engine** is a web application developed using the **MERN stack** (MongoDB, Express.js, React, Node.js) designed to evaluate user eligibility based on specified attributes. The engine allows for flexible rule definitions that determine if a user meets specific criteria for various applications.

## Features

- **User Attribute Management**: Manage user attributes like age, department, income, and spending.
- **Dynamic Rule Creation**: Easily create and modify rules that define eligibility criteria.
- **Combine Multiple Rules**: Combine various rules to create complex eligibility criteria.
- **Real-Time Evaluation**: Evaluate user eligibility in real-time based on defined rules.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Admin Dashboard**: An intuitive interface for managing rules and user attributes.

## Technologies Used

- **Frontend**: 
  - React.js
  - Material-UI (MUI)
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sandeepdara-sd/Rule_Engine.git
   cd Rule_Engine
Install dependencies for the backend:

bash
Copy code
cd backend
npm install
Install dependencies for the frontend:

bash
Copy code
cd ../frontend
npm install
Set up environment variables: Create a .env file in the backend directory and configure it as needed.

Run the application:

Start the backend server:
bash
Copy code
cd backend
npm start
Start the frontend server:
bash
Copy code
cd ../frontend
npm start
Usage
Creating Rules
Navigate to the Admin Dashboard.
Click on the Create Rule button.
Fill in the rule details, specifying the conditions that need to be met.
Save the rule to the database.
Combining Rules
In the Admin Dashboard, navigate to the Combine Rules section.
Select the rules you want to combine.
Define the logical operators (AND/OR) to combine the selected rules.
Save the combined rule.
Evaluating Rules
Go to the Evaluate Rule section on the Admin Dashboard.
Input the user attributes (age, department, income, spending).
Click the Evaluate button to check if the user meets the criteria set by the created or combined rules.
View the results in real-time.
How It Works
The Rule Engine allows administrators to define rules using a simple interface. Once rules are created, the engine evaluates user attributes against these rules to determine eligibility. The results are displayed in real-time on the dashboard, providing immediate feedback.

Contributing
Contributions are welcome! If you would like to contribute to the project, please follow these steps:

Screenshots:

create_rule:

![image](https://github.com/user-attachments/assets/3af61307-e575-413b-a33e-086619b9aa09)

Combine_rule:


![image](https://github.com/user-attachments/assets/9076560a-4993-4a37-9c68-1598c019a956)

evaluate_rule:


![image](https://github.com/user-attachments/assets/8a45f432-6407-412c-a5f4-f7c5774ba702)



Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
Sandeep Dara: sandeepdara-sd
Email: sandeepdara44@gmail.com
Feel free to reach out for any questions or collaborations!
