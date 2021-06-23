const bcrypt = require('bcrypt');

const admins = [
    {
        firstName : 'henry',
        lastName : 'agbasi',
        address : 'surulere, lagos',
        email : 'tochihenry28@gmail.com',
        phoneNo : 2348154198374,
        adminRole : 'manager',
        password : bcrypt.hashSync('iloveyou', 10),
    },
    {
        firstName : 'tobe',
        lastName : 'doe',
        address : 'surulere, lagos',
        email : 'tobe@gmail.com',
        phoneNo : 2348122222222,
        adminRole : 'storekeeper',
        password : bcrypt.hashSync('iloveyou', 10),
    },
    {
        firstName : 'tochi',
        lastName : 'john',
        address : 'surulere, lagos',
        email : 'tochi@gmail.com',
        phoneNo : 23481111111111,
        adminRole : 'supervisor',
        password : bcrypt.hashSync('iloveyou', 10),
    },
]

module.exports = admins;


// firstName :'henry',
//             lastName : 'ag',
//             Address : 'surulere, Lagos', 
//             email : 'tochihenry28@gmai.com',
//             password : 'iloveyou',
//             phoneNo : 2348154198374,
//             role : 'storekeeper