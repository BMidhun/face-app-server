const handleSignin =  (req,res,dbconnect,bcrypt) => {

  const request = req.body;
  
  dbconnect.select('*').from('login').where({email : request.email})
  .then(userdata => { console.log(userdata)

	password = userdata[0].password
        const cmp_value = bcrypt.compareSync(request.password, password);
        console.log(cmp_value);
        if(cmp_value){

	dbconnect.select('*').from('users').where({email:userdata[0].email})
	.then(user => {console.log(user[0]);
		
               const {id,username,email,entries,joined} = user[0];
	     
                 
		res.json({
			     "id": id,
			     "username":username,
			     "email": email,
			     "entries":entries,
			     "joined":joined
			      

				});
                  			
		});
          }

        else{
		console.log('Please enter correct password');
		res.json(false);
	}
	}).catch(error =>  {console.log('Please enter correct email'); res.status('404').json(false)})

}

module.exports = {

 handleSignin : handleSignin

}
