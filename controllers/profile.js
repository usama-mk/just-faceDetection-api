const handleProfileGet=(req, res,db) => {
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    }).then(user => {  //if no user found returns an empty array
        //    console.log(user[0])
        if (user.length) { //if user length exists i.e > 0
            res.json(user[0])
        } else {
            res.status(400).json('user not found')
        }
    }).catch(err => res.status(400).json('Error getting user'))

}
module.exports={
    handleProfileGet
}