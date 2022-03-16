class UserController{
    async index(req, res){}

    async create(req, res){
        var {email, name, password} = req.body;

        //Validando o Email

        if(email == undefined){
            res.status(403);
            res.json({err: "O email é invalido."})
        }
        res.send("Pegando o corpo da requisicao.")
    }
}

module.exports = new UserController();