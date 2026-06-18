const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db');
const AuthRoutes = require('./routes/user');
const appointmentsRoutes = require('./routes/appointments');
const hospitalRoutes = require('./routes/schedule')
require('dotenv').config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/auth', AuthRoutes);
app.use('/availability', hospitalRoutes);
app.use('/appointments', appointmentsRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const startServer = async () => {
    await connectDB();

}

startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});