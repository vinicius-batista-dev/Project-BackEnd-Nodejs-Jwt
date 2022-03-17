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
            if(validade != false){
                editarProduto.validade = validade;
            }

            if(nome_produto != undefined){
                editarProduto.nome_produto = nome_produto;
            }

            if(codigo_barras != undefined){
                editarProduto.codigo_barras = codigo_barras;
            }

            if(roles != undefined){
                editarProduto.roles = roles;
            }
            try{
                await knex.update(editarProduto).where({id: id}).table("produtos");
                return {status: true}
            }catch(err){
                return {status: false, err: err}
            }


        }else{
            return {status: false, err: "O produto ja existe."}
        }
    }

    async new(nome_produto, codigo_barras, validade ){
        try{

            var hash = await bcrypt.hash(password, 10);

            await knex.insert({validade, codigo_barras: hash, nome_produto, role: 0}).table("produtos");

        }catch(err){
            console.log(err);
        }
    }

    async findEmail(nome_produto){
        try{

            var result = await knex.select("*").from("produtos").where({nome_produto: nome_produto});
            
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
        var produto = await this.findById(id);

        if(produto != undefined){
            try{
                await knex.delete().where({id: id}).table("produtos");
                return {status: true}
            }catch(err){
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: "O produto nao existe, portanto nao pode ser deletado."}

        }
    }
    
}

module.exports = new User();