
const http = require('./app')
const fs=require('fs');
const Stock = require('./hojaExtra');



const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.info(`Server up and running on port${PORT}`));
