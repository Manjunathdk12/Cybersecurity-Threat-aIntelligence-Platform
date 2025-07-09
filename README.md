# Cybersecurity Threat Intelligence Platform: A Full-Stack Dockerized Web Application with Integrated Machine Learning for Threat Classification



## 🧰  Tech Stack Used
### 🔧 Frontend
```
React.js – UI library for building reusable components and dynamic web pages
Vite – Frontend build tool for faster development
Tailwind CSS – Utility-first CSS framework for styling 
React Router DOM – Client-side routing for React
Axios – Promise-based HTTP client for API requests
```

### 🛠 Backend
```
Node.js – JavaScript runtime for building the backend
Express.js – Minimalist web framework for building RESTful APIs
MySQL – Relational database for storing threat and user data
MySQL2 – MySQL driver for Node.js (for async/await and Promises)
JWT (jsonwebtoken) – Secure user authentication via JSON Web Tokens
dotenv – Loads environment variables from .env into process.env
```


### 🧠 Machine Learning
```
Python – Programming language used for ML logic
scikit-learn – ML library used to build the classification model
TF-IDF Vectorizer – Feature extraction from threat description
Logistic Regression – ML algorithm used to predict threat categories
Pickle – To serialize and save the trained model (model_pipeline.pkl)
child_process – Node.js module to run the Python model from backend
```

### 📦 Containerization & Deployment
```
Docker – To containerize frontend, backend, and MySQL services
Docker Compose – To manage multi-container deployment easily
```

## 📁 Folder Structure
```
project/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── threatsController.js
│ ├── routes/
│ │ ├── analyze.js
│ │ ├── auth.js
│ │ └── threats.js
│ ├── node_modules/
│ ├── Cybersecurity_Dataset.csv
│ ├── Dockerfile
│ ├── ingest.js
│ ├── model_pipeline.pkl
│ ├── package.json
│ ├── predict.py
│ ├── requirements.txt
│ ├── server.js
│ ├── threats_db.sql
│ └── train_model.py
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── Threats/
│ │ │ │ ├── NoResults.jsx
│ │ │ │ ├── Pagination.jsx
│ │ │ │ ├── SearchBar.jsx
│ │ │ │ ├── ThreatCard.jsx
│ │ │ │ └── ThreatList.jsx
│ │ │ ├── Layout.jsx
│ │ │ ├── LoadingSpinner.jsx
│ │ │ └── StatCard.jsx
│ │ ├── middleware/
│ │ ├── pages/
│ │ │ ├── Analyze.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── SearchThreatById.jsx
│ │ │ ├── Signup.jsx
│ │ │ ├── ThreatDetails.jsx
│ │ │ └── Threats.jsx
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── Dockerfile
│ ├── vite.config.js
│ ├── index.html
│ └── package.json
│
├── docker-compose.yml
└── .dist/ (Optional production build folder)
```


## 📦 Prerequisites
Make sure the following are installed on your system before getting started:<br>
## 🧰 System Requirements
| Tool                        | Version/Details             | Purpose                            |
| --------------------------- | --------------------------- | ---------------------------------- |
| **Node.js**                 | v16.x or later              | Required to run frontend & backend |
| **npm**                     | Comes with Node.js          | Dependency management              |
| **Python**                  | 3.7 or later                | For ML model integration           |
| **MySQL**                   | 8.x (or Dockerized version) | Threat data storage                |
| **Docker & Docker Compose** | Latest stable versions      | Containerized deployment           |
| **Git**                     | Optional                    | Clone project from GitHub          |

### 🔧 Node.js Setup
Install required global packages (if not already):
 ```sh
 npm install -g vite
```

### 🐍 Python Dependencies
From the /backend folder, install dependencies:
```
pip install -r requirements.txt
```
Make sure the following Python packages are installed:
scikit-learn
pandas
numpy
joblib
 ### These are already included in requirements.txt.
 
### ⚙️ MySQL Setup (if not using Docker)
```
Install MySQL Server (or use MySQL Workbench).
Create a database named: threats_db.
Run the SQL file: threats_db.sql to create the schema.
Insert data using node ingest.js.
```

✅ Alternatively, you can skip the above and use Docker which automates all of this.

### 🐳 Docker (for deployment)
Install Docker Desktop
Ensure Docker is running before you execute docker-compose up.
```
docker --version
docker-compose --version
```


🔗 Additional Libraries/Tools Used
```
React Router DOM: Client-side routing
Axios: HTTP client for frontend-backend API communication
Tailwind CSS: Utility-first CSS framework
dotenv: Environment variable management in Node.js
mysql2: MySQL client for Node.js
child_process: Used to run Python scripts from Node.js
```

# 🧪 Deployment Instructions
Choose ONE of the following methods to run the project:

## 🚀 Option 1: Deployment using Docker (Recommended)
⚡ Best for quick setup. No need to install Node, Python, MySQL separately.
### 📥 1. Clone the repository
```
1.git clone https://github.com/Manjunathdk12/Cybersecurity-Threat-Intelligence-Platform.git
2.cd Cybersecurity-Threat-Intelligence-Platform
3.cd project
```

### 🐳 2. Start the containers
Inside root folder project,run:
```
docker-compose up --build
```
After this the docker initialization starts and u can visit docker-desktop for the ui representation

### 📦 3. Insert dataset into MySQL (one-time setup)
In another terminal inside /backend folder, run:
## (Important) 
✅ This step must be done only once after containers are up.
```
docker exec -it backend_app bash
node ingest.js
```
This loads the CSV data into MySQL.


### ✅ 4. Access the application
Frontend: http://localhost:5173
Backend API: http://localhost:5000

##  💻 Option 2: Manual Local Deployment (Non-Docker)
⚠️ Requires Node.js, Python 3, and MySQL installed locally.

### 📥 1. Clone the repository
```
1.git clone https://github.com/Manjunathdk12/Cybersecurity-Threat-Intelligence-Platform.git
2.cd Cybersecurity-Threat-Intelligence-Platform
3.cd project
```
### 🛠️ 2. Backend Setup
```
cd backend
npm install
```
### 2.1 🔐 Create .env file(if present change the password)
```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=threats_db
PORT=5000
JWT_SECRET=your_jwt_secret
```
### 2.2 🧱 Create Database
Open MySQL Workbench
Run threats_db.sql file to create the schema

### 2.3 📥 Insert Data(inside backend folder)
```
node ingest.js
```
### 2.4 🤖 Train ML Model
```
python train_model.py
```

### 3.🚀 Start Backend
```
npm run dev
```
## 🎨 3. Frontend Setup
```
cd ../frontend
npm install
npm run dev
```
✅ Access Frontend
Go to http://localhost:5173

### 📊 API Endpoints to Verify (Optional)
| Method | Endpoint             | Description                          |
| ------ | -------------------- | ------------------------------------ |
| POST   | `/api/signup`        | Register a user                      |
| POST   | `/api/login`         | Get JWT token                        |
| GET    | `/api/threats`       | Get threat data                      |
| GET    | `/api/threats/:id`   | View individual threat               |
| GET    | `/api/threats/stats` | Dashboard stats                      |
| POST   | `/api/analyze`       | 🔮 Predict category from description |

### ✅Final checklist
| Task                    | Should Work |
| ----------------------- | ----------- |
| View Dashboard Data     | ✅           |
| Search & Filter Threats | ✅           |
| Add CSV Data to MySQL   | ✅           |
| ML Prediction           | ✅           |
| JWT Auth Login/Signup   | ✅           |

### 🔍 Features
```
✅ JWT authentication for secure access
✅ Browse all cybersecurity threats
✅ Search and filter threats by description or category
✅ Pagination for large datasets
✅ Detailed view for individual threats
✅ Predict category using ML for new descriptions
✅ Severity score visualization
```
## 📸 UI Screenshots

### 🔐 Login Page
![Login](https://drive.google.com/uc?export=view&id=1fwwZq1Hb0QUG8yGBJ0kXdUjv6nI4C9nm)

### 📊 Dashboard
![Dashboard](https://drive.google.com/uc?export=view&id=1MikAzWizOETtkNVHJ09ELO-mrPkHMieb)

### 🛡️ Threats List
![Threats](https://drive.google.com/uc?export=view&id=1n4KZeDNz7bkaKSZbEDKVaSUorWvqy31i)

### 🤖 Analyze Threat (ML Prediction)
![Analyze](https://drive.google.com/uc?export=view&id=1mQEguNultyjSzZd4nayNV38-8rZ5gFn6)


## 🧑‍💻 Author
```
Manjunath
Cybersecurity Intern – PES University
GitHub: @Manjunathdk12
```

## 📜 License
```
MIT Licence
This project is intended for educational and demo purposes
```

