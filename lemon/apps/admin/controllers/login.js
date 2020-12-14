let User = require("../../../database/models/users");
var jwt = require('jsonwebtoken');
const login = (req, res) => {
  // const { email, password } = req.body;

  User.find({email: req.body.email, role: "admin"} ).then( data => {
    // console.log(data);
    console.log(req)
    if(data.length > 0)
    {
      if(data[0].password === req.body.password )
        if(data[0].status)
        {
          returnData={
            name: data[0].name,
            photo: data[0].photo,
            id: data[0]._id,
            token:  jwt.sign({ data: data[0]._id }, 'Henshin')
            
          }
          return res.json( returnData);

        }
        else
        {
          console.log("not active");
          return res.status(400).json("Your accout has ban. Please contact with the system later");
        }
      
    }

    console.log("Accout no found !");
    return res.status(404).json("Thông tin không đúng");


  }
    

  ).catch(err => console.log(err))

  // if (email != "admin" || password != "admin") {
  //   return res.status(400).json("err, Hack?? 😣");
  // }
  // return res.json("Ok go forward");
};

module.exports = { login };
