var User = require('../models/User');
var PasswordToken = require("../models/PasswordToken");
const { default: knex } = require('knex');
class UserController{
    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async edit(req, res){
        var {id, name, role, email} = req.body;
        var resultado = await User.update(id, name, email, role);

        if(resultado != undefined){
            if(resultado.status){
                res.status(200);
                res.send("Tudo Ok!")  
            }else{
                res.status(406);
                res.send(resultado.err);
            }
        }else{
            res.status(406);
            res.send("Ocorreu error no servidor.")
        }
    }

    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id);

        if(user == undefined){
            res.status(404);
            res.send({});
        }else{
            res.status(200);
            res.json(user);
        }
    }

    async create(req, res){
        var {email, name, password} = req.body;

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

    async remove (req, res){
        var id = req.params.id;

        var resultado = await User.delete(id);

        if(resultado.status){
            res.status(200);
            res.send("Tudo OK.")
        }else{
            res.status(406);
            res.send(resultado.err)
        }
    }

    async recoverePassword(req, res){
        var email = req.body.email;

        var resultado = await PasswordToken.create(email);

        if(resultado.status){
           res.status(200);
           res.send("" + resultado.err);
        }else{
            res.status(406);
            res.send(resultado.err);
        }
    }

    async validate(token){
        try{
           var resultado = await knex.select().where({token: token}).table("passwordtokens");
        
           if(resultado.length > 0){
                var tk = resultado[0];

                if(tk.used){
                    return false;                                   
                }    
           }else{
               return false;
           }
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

module.exports = new UserController();