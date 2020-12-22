let User = require("../../../database/models/users");
var jwt = require('jsonwebtoken');
const login = (req, res) => {
  // const { email, password } = req.body;

  User.findOne({email: req.body.email, role: "admin"} ).then( data => {
    // console.log(data);
    console.log(req)

      if(data.password === req.body.password )
        if(data.status)
        {
          returnData={
            name: data.name,
            photo: data.photo,
            id: data._id,
            
          }
          return res.json({ data: returnData, token:  jwt.sign({ data: data._id }, 'Henshin')});

        }
        else
        {
          console.log("not active");
          return res.status(400).json("Your accout has ban. Please contact with the system later");
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
