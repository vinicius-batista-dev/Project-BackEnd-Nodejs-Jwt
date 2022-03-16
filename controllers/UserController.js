var User = require('../models/User');

class UserController{
    async index(req, res){}

    async create(req, res){
        var {email, name, password} = req.body;

        //Validando o Email
        if(email == undefined){
            res.status(403);
            res.json({err: "O email é invalido."})
            return;
        }

        var emailExistir = await User.findEmail(email);

        if(emailExistir){
            res.status(406);
            res.json({err: "O email ja esta cadastrado!"})
            return;
        }
        
        await User.new(email, password, name);

        res.status(200);
        res.send("Tudo Ok");
    }
}

module.exports = new UserController();