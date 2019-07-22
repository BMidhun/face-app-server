const server = require('express')();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

const cors = require('cors');

var knex = require('knex')

const dbconnect = knex({
    client: 'pg',
    connection: {
       connectionString: process.env.DATABASE_URL,
       ssl: true,
    }
});

const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');

//console.log(dbconnect.select('*').from('users'));



server.use(bodyParser.json());

server.use(cors());

server.get('/', (req, res) => {


    res.send('Home page')

})


server.post('/signin', (req,res) => {signin.handleSignin(req,res,dbconnect,bcrypt)})


server.post('/register', (req,res) => {register.handleRegister(req,res,dbconnect,bcrypt)})
                                    
server.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,dbconnect)})


server.post('/handleapi', (req,res) => {image.handleApi(req,res)})
                                    
server.put('/image', (req,res) => {image.handleImage(req,res,dbconnect)})

//console.log(process.env);

const PORT = process.env.PORT || 3001;
                                    
server.listen(PORT, () => {

     console.log(`Server is running on port ${PORT}`);

 })

// https://salty-garden-47828.herokuapp.com/ 



                                    /*

                                    ---------------------------------------------------------------------
                                    server.post('/register',(req,res) => {

                                     const request = req.body;
                                     console.log(request);
                                     let password = request.password;
                                     
                                     password = bcrypt.hashSync(password,12)

                                    login.login_list.push({
                                      
                                             username : request.username,
                                    	 hash : password,
                                             email : request.email 

                                    	})

                                    console.log(login.login_list);

                                     const user = {
                                     
                                       id       : request.username+request.email,
                                       username : request.username,
                                       email    : request.email,
                                       password : request.password,
                                       entries  :  '0',
                                       joined   : new Date()	

                                    }

                                     database.users.push(user);


                                     res.send(database.users[database.users.length -1]);

                                    });

                                    -----------------------------------------------------------

                                    server.get('/profile/:id',(req,res)=>{

                                     const {id} = req.params;
                                     
                                     let found = false;

                                     //console.log(database.user[1].id);
                                     //console.log(typeof(database.user[0].id));
                                     //console.log(typeof(id));
                                      
                                     database.users.forEach(user => {

                                     if(user.id === id){
                                        
                                        found = true;
                                        res.send(user);
                                      } 	
                                    })

                                    if(!found){

                                     res.status(404).send("Sorry Profile not Found");
                                    }

                                    })

                                    -----------------------------------------------------

                                    server.post('/register',(req,res) => {

                                     const request = req.body;

                                    if(request.email.length ===0 && request.username.length === 0 && request.password.length === 0){

                                      res.json({"Message":"Please fill in the signup form",
                                    	      "register" : false});

                                    }

                                    if(request.email.length === 0){

                                        res.json({"Message":"Please enter a email id",
                                    	      "register" : false});
                                    }

                                    else if(request.username.length === 0){

                                        res.json({"Message":"Please enter a username",
                                    	      "register" : false});
                                    }

                                    else if(request.password.length === 0){

                                        res.json({"Message":"Please enter a password",
                                    	      "register" : false});
                                    }
                                     
                                    else{

                                     dbconnect('users')
                                            .returning('*')
                                    	.insert({

                                    	 username : request.username,
                                    	 joined   : new Date(),
                                    	 email    : request.email
                                     
                                    }).then(

                                     user => res.json({"Message":user[user.length-1],
                                    		   "register":true})

                                    ).catch(
                                      
                                      error => {
                                    	     console.log(error)
                                                 res.status('404').json({"Message":false})
                                    }

                                    )

                                    }

                                    });


--------------------------------------------------------------------


	server.put('/image', (req, res) => {

                                        const {
                                            id
                                        } = req.body
                                        let found = false;
                                        database.users.forEach(user => {

                                            if (user.id === id) {

                                                found = true;
                                                user.entries++;
                                                res.send(user);
                                            }

                                        })

                                        if (!found) {

                                            res.status(404).send("Sorry Profile not Found");
                                        }


                                    })


---------------------------------------------------------------------------------

                                    
server.put('/image', (req, res) => {

         const request = req.body;
	 
	 dbconnect.select('*').from('users').where({id:request.id})
         .then(data => { 
	
	    if(data.length){
           
              let entry = data[0].entries;
	      entry++;
              console.log(entry);
 	      dbconnect('users').where({id:request.id}).update({entries:entry});
        
	} else{ console.log('Hello');}		

		}) 

})

--------------------------------------------------------------------------------------
server.post('/signin', (req, res) => {

    const request = req.body;

    console.log(request);

    dbconnect.select('*').from('login').innerJoin('users','login.email','users.email')
	     .then(userdata => {
		   console.log(userdata[userdata.length-1]);
		   const {id,email,entries,joined,username} = userdata[userdata.length-1];
		   const cmp_value = bcrypt.compareSync(request.password, userdata[userdata.length-1].password);
		   console.log(cmp_value);
		   if(cmp_value){
                        
                      res.json({
				 "id":id,
				 "username":username,
				 "email":email,
				  "entries":entries,
				  "joined":joined				
			});
        
		
		 }

 		 else{
			res.status('400').json(false);	}
     
			    }).catch(error => res.status('400').json(false))

    //const cmp_value = bcrypt.compareSync(request.password, 'enter hardcode value of hash');

   


})

                                    */
