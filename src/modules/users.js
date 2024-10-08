const fs = require('fs');
const path = require('path');

const getUsers = () => {
    const filePath = path.join(__dirname, '../data/users.json');

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}
module.exports = { getUsers };



