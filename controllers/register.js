const handleRegister = (req, res,dbconnect,bcrypt) => {

            const request = req.body;
            console.log(request);

            if (request.email.length === 0 && request.username.length === 0 && request.password.length === 0) {

                res.json({
                    "Message": "Please fill in the signup form",
                    "register": false
                });

            }

            if (request.email.length === 0) {

                res.json({
                    "Message": "Please enter a email id",
                    "register": false
                });
            } else if (request.username.length === 0) {

                res.json({
                    "Message": "Please enter a username",
                    "register": false
                });
            } else if (request.password.length === 0) {

                res.json({
                    "Message": "Please enter a password",
                    "register": false
                });
            } 

else {

	const hash = bcrypt.hashSync(request.password,10);
	dbconnect.transaction(trx => {
		
	trx.insert({ password:hash, email : request.email })
	.into('login').then( () => {
	
	return trx('users').returning('*').insert({email:request.email, username:request.username, joined:new Date() })
	.then(user => {res.json( {"register": true,"user":user[0]} );})	
		
	}).then(trx.commit).catch(trx.rollback)
		
	}).catch(err => res.json({"Message":false})) 


}

}


module.exports = {

 handleRegister : handleRegister

}
