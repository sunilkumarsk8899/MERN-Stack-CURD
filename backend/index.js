require('./db/Config');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(express.json());
app.use(cors());

/**
 * model
 */
const User = require('./db/User');


app.get('',(req,resp)=>{
    resp.send('home working');
});

/**
 * register
 */
app.post('/register-user', async (req,resp)=>{
    
    let existCheck = await User.findOne({ email : req.body.email }).select('-password');
    if(existCheck){
        resp.status(400).send({ 'result' : existCheck, 'status' : 400 });
    }else{
        const user = new User(req.body);
        var result = await user.save();
        resp.status(200).send({ 'result' : result, 'status' : 200 });
    }

});

app.listen(7000,()=>{
    console.log('backend port working on 7000');
});