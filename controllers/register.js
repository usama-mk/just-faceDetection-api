handleRegister=(req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    var hash = bcrypt.hashSync(password);
   db.transaction(trx=>{
       trx.insert({
        email: email,
        hash: hash
       }).into('login').returning('email')
       .then(loginEmail=>{ //returning an array
        trx('users')
        .returning('*')
        .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date()
        }).then(user => {
            console.log('posting to db: ');
            res.json(user[0]);
        }).then(trx.commit)
        .catch(trx.rollback)
       })
   })

}
module.exports={
    handleRegister: handleRegister
}