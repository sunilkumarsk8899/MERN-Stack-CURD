require('./db/Config');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(express.json());
app.use(cors());

const jwtToken = require('jsonwebtoken');
const secretKey = 'mern-curd-db';

/**
 * model
 */
const User = require('./db/User');
const Product = require('./db/Product');


app.get('',(req,resp)=>{
    resp.send('home working');
});

/**
 * register
 */
app.post('/register-user', async (req,resp)=>{
    
    let existCheck = await User.findOne({ email : req.body.email }).select('-password');
    if(existCheck){
        resp.send({ 'result' : existCheck, 'status' : 400 });
    }else{
        const user = new User(req.body);
        var result = await user.save();
        resp.send({ 'result' : result, 'status' : 200 });
    }

});

/**
 * login
 */
app.post('/login', async (req,resp)=>{
    let getLoginInfo = await User.findOne(req.body).select('-password');
    if(getLoginInfo){
        jwtToken.sign({getLoginInfo}, secretKey, { expiresIn: "2h" },(err,token)=>{
            if(err){
                resp.send( { message : 'Somthing Went Wrong', status : 404 } ); // somthing wont wrong                    
            }else{
                resp.send( { message : 'User Found', userData : getLoginInfo, status : 200, token : `bareer ${token}` } ); // user found
            }
        });
    }else{
        resp.send({'status':400, 'userData':'', 'message':'record not found'});
    }
});

/**
 * profile get info
 */
app.get('/profile-update/:id', verifyToken, async (req,resp)=>{
    const result = await User.findOne({_id : req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No Record Found"});
    }
});

/**
 * profile update
 */
app.put('/profile-update/:id', verifyToken, async (req,resp)=>{
    let checkPass = await User.findOne({_id : req.params.id});
    if(checkPass){
        if(checkPass.password == req.body.oldpassword){
            let result = await User.updateOne(
                { _id   : req.params.id },
                { $set  : req.body }
            );
            resp.send({'result':result, 'status':200,'pass':checkPass.password});
        }else{
            resp.send({'result':'', 'status':400,'pass':checkPass.password,'message':'password not match'});
        }
    }
});

/**
 * add product
 */
app.post('/add-product', verifyToken, async (req,resp)=>{
    const check = await Product.findOne({ title : req.body.title });
    if(check){
        resp.send({status:400,'result':'Already this product exist'});
    }else{
        const product = await new Product(req.body);
        let result = await product.save();
        if(result){
            resp.send({ 'data' : result, 'status' : 200,'result':'Add Product Successfully' });
        }else{
            resp.send('somthing went wrong');
        }
    }
});

/**
 * get product
 */
app.get('/get-product', verifyToken, async (req,resp)=>{
    let result = await Product.find();
    resp.send({ 'data' : result, 'status' : 200 });
});




/**
 * verify token
 */
function verifyToken(req,resp,next){
   
    let token = req.headers['authorization'];
    if(token){
        token = token.split(" ")[1];
        jwtToken.verify(token,secretKey,(err,valid)=>{
            if(err){
                resp.send({result : 'Invalid Token'});
            }else{
                next();
            }
        });
    }else{
        resp.status(404).send({result : 'Please provide token'});
    }

}






app.listen(7000,()=>{
    console.log('backend port working on 7000');
});