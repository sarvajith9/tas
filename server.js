const app = require('./app');
const PORT = process.env.PORT || 7000;
const db = require('./services/dbConnection');
const { createTableIfNotExists } = require('./models/index');


createTableIfNotExists()
  .then(() => {
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
        db.connect()
        .then(() => console.log('✅ Connected to PostgreSQL'))
        .catch((err) => console.error('❌ PostgreSQL connection error:', err));
});
});
