const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Todos} = require('./../model/todo');
const {ObjectId} = require('mongodb');
const {ObjectID} = require('mongodb');

const todos = [
 {
 _id: new ObjectId(),
 text: 'Something to do one'
 },
 {
 _id: new ObjectId(),
 text: 'Something to do second'
 }
];
beforeEach((done) => {
 Todos.remove({}).then(()=> {
 return Todos.insertMany(todos);
 }).then(()=> done());
});
describe('POST /todos', () => {
 it('should create a new todo', (done) => {
 var text = 'Test todo text';
 request(app)
 .post('/todos')
 .send({text})
 .expect(200)
 .expect((res) => {
 expect(res.body.text).toBe(text);
 })
 .end((err, res) => {
 if (err) {
 return done(err);
 }
 Todos.find({text}).then((todos) => {
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

describe('Get /todos',()=>{
 it('should get all todos',(done)=>{
 request(app)
 .get('/todos')
 .expect(200)
 .expect((res)=>{
 expect(res.body.todos.length).toBe(2);
 
 }).end(done); 
 });
});

describe('Get /todos/id',()=>{
 it('should get a single todos',(done)=>{
 request(app)
 .get(`/todos/${todos[0]._id.toHexString()}`)
 .expect(200)
//  .expect((res)=>{
//  expect(res.body.todos[0].text).toBe(todos[0].text);
  
//  })
.end(done); 
 });
 it('should return 404 for non-object ids',(done)=>{
 request(app)
 .get(`/todos/${123}`)
 .expect(404)
 .end(done); 
 });
 
//  it('should return 404 if todo not found',(done)=>{
//    var id1 = new ObjectID().toHexString(); 
//     request(app)
//     .get(`/todos/${id1}`)
//     .expect(404)
//     .end(done);

// }); 
// }); 

describe('Delete Test Cases',()=>{

    var hexId = todos[1]._id.toHexString();

    it('should remove a todo ',(done)=>{

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        // .expect((res)=>{
        //     expect(res.body.todos._id).toBe(hexId);
        // })
        .end((err, res)=>{

            if(err){
                return done(err);
            }

            Todos.findById(hexId).then((todo)=>{
                expect(todo).toNotExist();
                done();
            }).catch((e)=> done(e));

        });
    });

});

