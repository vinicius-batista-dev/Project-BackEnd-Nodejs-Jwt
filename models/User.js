var knex = require('../database/connection')
var bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

class User {
    async new(email, password, name){
        try{
            //10 numero criptografia
            var hash = await bcrypt.hash(password, 10);

            await knex.insert({email, password: hash, name, role: 0}).table("users");

        }catch(err){
            console.log(err);
        }
    }

    async findEmail(email){
        try{

            var result = await knex.select("*").from("users").where({email: email});

        //Procurar um email e vai retornar falso
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }
    }
}

module.exports = new User();