const jw = require('jsonwebtoken');
const User =  require('../models/user');

const auth = async (req, res, next) => {
    //console.log(req.header('Authorization'));
    try{
        debugger;
        const token = req.header('Authorization').replace('Bearer', '').trim();
        const decoded = jw.verify(token, 'nodecourse');
        //console.log(decoded)
        const user = await User.findOne({_id: decoded._id});
        const exist = user.tokens.filter(item => item.token = token);
        console.log('existe', exist)

        if(!exist)
            throw new Error();

        if(!user)
            throw new Error();

        req.token = token;
        req.user = user;
        next();
    }catch(e){
        res.status(401).send({error: 'You are not authenticate'});
    }
}

module.exports = auth;

