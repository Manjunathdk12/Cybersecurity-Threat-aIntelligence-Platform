const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const threatRoutes = require('./routes/threats');
app.use('/api/threats', threatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const analyzeRoute = require("./routes/analyze");
app.use("/api/analyze", analyzeRoute);
