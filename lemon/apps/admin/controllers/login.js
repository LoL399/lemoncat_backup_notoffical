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
          return res.json({ data: returnData, token:  jwt.sign({ data: data._id }, process.env.TOKEN_SECRET_ADMIN)});

        }
        else
        {
          console.log("not active");
          return res.status(200).json({err:403});
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
