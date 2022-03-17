var knex = require('../database/connection')
var bcrypt = require('bcrypt');
const { hash } = require('bcrypt');

class Produto {

    async findAll(){
        try{
            var result = await knex.select(["id", "nome_produto","codigo_barras","validade", "role"]).table("produtos");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id", "nome_produto","codigo_barras","validade", "roles"]).where({id: id}).table("users");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async update(id, nome_produto, codigo_barras, validade, roles){
        var produto = await this.findById(id);

        if(produto != undefined){
            var editarProduto = {};

            if(codigo_barras != undefined){
                if(nome_produto!= user.nome_produto){
                    var resultado = await this.findProduct(nome_produto);

                    if(resultado == false){
                        editarProduto.nome_produto = nome_produto;
                    }else{
                        return {status: false, err: "O produto ja esta cadastrado."}
                    }
                }
            }

            if(name != undefined){
                editarUsuario.name = name;
            }

            if(role != undefined){
                editarUsuario.role = role;
            }
            try{
                await knex.update(editarUsuario).where({id: id}).table("users");
                return {status: true}
            }catch(err){
                return {status: false, err: err}
            }


        }else{
            return {status: false, err: "O usuario nao existe."}
        }
    }

    async new(email, password, name){
        try{

            var hash = await bcrypt.hash(password, 10);

            await knex.insert({email, password: hash, name, role: 0}).table("users");

        }catch(err){
            console.log(err);
        }
    }

    async findEmail(email){
        try{

            var result = await knex.select("*").from("users").where({email: email});
            
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

    async delete(id){
        var user = await this.findById(id);

        if(user != undefined){
            try{
                await knex.delete().where({id: id}).table("users");
                return {status: true}
            }catch(err){
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: "O usuario nao existe, portanto nao pode ser deletado."}

        }
    }
    
}

module.exports = new User();