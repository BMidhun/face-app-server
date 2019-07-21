const Clarifai = require('clarifai');

const app = new Clarifai.App({

  apiKey:'39fc854f557c47ac8c7625acaa9155f9',

});

const handleApi = (req,res) => {

      const request = req.body;
      console.log(request)

     app.models.predict(Clarifai.FACE_DETECT_MODEL, request.imgUrl)
     .then(data => {console.log(data); 
		res.json(data)}).catch(error => res.status('400').json(false));

}

const handleImage = (req, res, dbconnect) => {

         const request = req.body;
	 dbconnect('users').where({id:request.id}).increment('entries', 1).then(() => { 

	dbconnect.select('entries').from('users').where({id:request.id}).then(data => res.json(data[0]))

	})
	 
};

module.exports = {

 handleImage : handleImage,

 handleApi   : handleApi

}
