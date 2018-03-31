const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server');
const { Todos } = require('./../model/todo');
const { ObjectId } = require('mongodb');
const { ObjectID } = require('mongodb');
const { todos, populateTodos, users, populateUsers } = require('./seed');


beforeEach(populateTodos);
beforeEach(populateUsers);
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todos.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todos.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('Get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);

            }).end(done);
    });
});

describe('Get /todos/id', () => {
    it('should get a single todos', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            //  .expect((res)=>{
            //  expect(res.body.todos[0].text).toBe(todos[0].text);

            //  })
            .end(done);
    });
    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/${123}`)
            .expect(404)
            .end(done);
    });
});

//  it('should return 404 if todo not found',(done)=>{
//    var id1 = new ObjectID().toHexString(); 
//     request(app)
//     .get(`/todos/${id1}`)
//     .expect(404)
//     .end(done);

// }); 
// }); 

describe('Delete Test Cases', () => {

    var hexId = todos[1]._id.toHexString();

    it('should remove a todo ', (done) => {

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            // .expect((res)=>{
            //     expect(res.body.todos._id).toBe(hexId);
            // })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Todos.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));

            });
    });

});

describe('GET /users/me',()=>{

    it('should return user if authenticated',(done)=>{

        request(app)
        .get('/users/me')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
            
        }).end(done);

    });


    it('should return 401 if authenticated',(done)=>{
        request(app)
        .get('/users/me')
        .set('x-auth', 'jnfkjdsb')
        .expect(401)
        .end(done);
    });

});


describe('Post /users',()=>{

    it('should create a user',(done)=>{

        email='users@post.com';
        password= '123456';
       
        request(app)
        .post('/newuser')
        .send({email, password })
        .expect(200)
        .expect((res)=>{
            expect(res.body.email).toBe(email);
            
            
        }).end(done);
    });

    it('should return validation errors if request invalid',(done)=>{

        invalidEmail= 'a1.com';
        password= '12345';

        request(app)
        .post('/newuser')
        .send({invalidEmail, password})
        .expect(400).end(done);

    });

    it('should not create user if email in use',(done)=>{

        var alreadyUser= 'userone@seed.com';
        var password= '123455';

        request(app)
        .post('/newuser')
        .send({alreadyUser, password})
        .expect(400).end(done);
    });
});