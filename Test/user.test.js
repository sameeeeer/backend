var User = require('../models/user');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/blog';
beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async() => {
    await mongoose.connection.close();
});
describe(' Testing of User Schema', () => {
    it(' Testing of Adding User', () => {
        const user = {
            'name': 'Sameer karki',
            'email': 'sameer@gmail.com',
            'password': 'sam00sau35'
        };

        return User.create(user)
            .then((user) => {
                expect(user.email).toEqual('sameer@gmail.com');
            });
    });
});
it('Testing of User Deletion', async() => {
    const status = await User.deleteOne({ "_id": "5e44f4249cf67443d4fdb28c" });
    expect(status.ok).toBe(1);
    
});

