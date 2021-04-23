var jwt = require('jsonwebtoken');
 exports.authenlogin = function(req,res,next){
     let {token} = req.session 
     if(token){
        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        if(err){
            res.redirect('/login')
        }else{
            next()
        }
          });
     }else{
         res.redirect('/login')
     }
    
 }