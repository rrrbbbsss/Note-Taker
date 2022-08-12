const express = require('express');
const apiRoutes = require('./routes/apiRoutes/index');
const htmlRoutes = require('./routes/htmlRoutes/index');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming JSON data
app.use(express.json());
// serve public files
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})