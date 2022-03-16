# System-Login

  Do you need a system that has registration and login and that encrypts the user's password when saved in the bank ?
  
### Example Use Case

    - Register JWT Password
    - Login

## Returning a 403 status

  - Email is invalid.

## Install package bcrypt

  - npm install bcrypt

## create user function

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

  
 