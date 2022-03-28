const path = require('path');

const rootPath = __dirname;

let dbUrl = 'mongodb://localhost/alga-express';
let port = 8000;

if (process.env.NODE_ENV === 'test') {
    dbUrl = 'mongodb://localhost/alga-express_test';
    port = 8010;
}

module.exports = {
    rootPath,
    port,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
        url: dbUrl,
    },
    resetPasswordUrl: "https://alga-express.ddns.net/",
};

