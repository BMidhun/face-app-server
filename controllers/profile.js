const handleProfile = (req, res, dbconnect) => {

                                        const userid = req.params.id;
                                        console.log(userid);
                                       
                                        dbconnect.select('*').from('users') .where({
                                            id: userid
                                        }).then(user => {

                                                if (user.length) {

                                                    res.json(user[0])
                                                } else {
                                                    res.status('404').json("User not found")
                                                }

                                            })

                                    }

module.exports = {

 handleProfile : handleProfile

}
