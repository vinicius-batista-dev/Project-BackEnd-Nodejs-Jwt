const knex = require("knex");


class Juiz{
    async findAll(){
        try{
            var result = await knex.select(["id", "arbitro", "partida", "cidade", "pais", "estado", "date"]).table("arbitro");
        }catch(err){
            console.log(err)
            return[];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id", "arbitro", "partida", "cidade", "pais", "estado", "date"]).where({id: id}).table("arbitro");
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

    async findArbitro(arbitro){
        try{
            var result = await knex.select(["id", "arbitro", "partida", "cidade", "pais", "estado", "date"]).where({arbitro: arbitro}).table("arbitro");
            
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


    async findPartida(partida){
        try{
            var result = await knex.select(["*"]).where({partida: partida}).table("arbitro");

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

    async findCidade(cidade){
        try{
            var result = await knex.select(["*"]).where({cidade: cidade}).table("arbitro");

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

    async findPais(pais){
        try{
            var result = await knex.select(["*"]).where({pais: pais}).table("arbitro");

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

    async findEstado(estado){
        try{
            var result = await knex.select(["*"]).where({estado: estado}).table("arbitro");

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

    
    async findDate(date){
        try{
            var result = await knex.select(["*"]).where({date: date}).table("arbitro");

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
    
    
    async new ( arbitro, partida, cidade, pais, estado, date){
        try{
            await knex.insert({arbitro, partida, cidade, pais, estado, date }).table("arbitro");
        }catch(err){
            console.log(err);
        }
    }

    async atualizarArbitro(id, arbitro, partida, cidade, pais, estado, date){

        var arbitro = await this.findById(id);

        if(arbitro != undefined){

            var editArbitro = {};

            if(partida != undefined){ 
                if(partida != arbitro.partida){
                   var result = await this.findArbitro(arbitro);
                   if(result == false){
                        editArbitro.partida = partida;
                   }else{
                        return {status: false,err: "O arbitro já está cadastrado"}
                   }
                }
            }

            if(cidade != undefined){
                editArbitro.cidade = cidade;
            }

            if(pais != undefined){
                editArbitro.pais = pais;
            }

            if(estado != undefined){
                editArbitro.estado = estado;
            }

            if(date != undefined){
                editArbitro.date = date;
            }

            try{
                await knex.update(editArbitro).where({id: id}).table("arbitro");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O arbitro não existe!"}
        }
    }
}