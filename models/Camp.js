const { default: knex } = require("knex");

class Camp{
    async findAll(){
        try{
            var result = await knex.select(["id", "juniores", "profissionais", "times", "partidas", "cidades", "estados"]).table("camp");
        }catch(err){
            console.log(err);
            return[];
        }
    }

    async findById(id){
      try{
          var result = await knex.select(["id", "juniores", "profissionais", "times", "partidas", "cidades", "estados"]).where({id: id}).table("camp");
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

    async findByPartidas(partidas){
        try{
            var result = await knex(["id", "juniores", "profissionais", "times", "partidas", "cidades", "estados"]).where({partidas: partidas}).table("camp");
            
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

    async new(juniores, profissionais, times, partidas, cidades, estados){
        try{
            await knex.insert({juniores, profissionais, times, partidas, cidades, estados})
        }
    }
}