# System-Login

  Do you need a system that has registration and login and that encrypts the user's password when saved in the bank ?
  
### Example Use Case

    - Register JWT Password
    - Login

#### Returning a 403 status

  - Email is invalid.

#### Install package npm install

    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.2",
    "express": "^4.17.3",
    "knex": "^1.0.4",
    "mysql2": "^2.3.3"


#### create user function


    async create(req, res){
          var {email, name, password} = req.body;

          //Validando o Email
        if(email == undefined){
            res.status(403);
            res.json({err: "O email é invalido."})
            return;
        }
        
        await User.new(email, password, name);

        res.status(200);
        res.send("Tudo Ok");
    }

  
#### Find Email function


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

  
 