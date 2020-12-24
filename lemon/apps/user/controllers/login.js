const User = require("../../../database/models/users");
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');


const createToken = id =>{
  return jwt.sign(id, 'Henshin') }

const sendMail = async (user, subject, body) => {
  console.log("creating ... ")
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: "Lemon Cat Sevice Mail",
    to: user,
    subject,
    text: body,
    html: `<b>${subject}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

const updateByUser = (req, res) => {
  const {name, photo, id} = req.body;
  User.findById(id).then((user) => {

      user.name = name;
      user.photo = photo;

      user.save().then(()=> res.status(201).json("userUpdate")).catch((err) => res.status(400).json("Error: " + err));

  }).catch((err) => res.status(400).json("Error: " + err));
}

const getUserData=(req, res)=>{
  const id = req.params.id
  User.findById(id).select("name photo").then((user) => res.status(200).json(user)).catch((err) => res.status(400).json("Error: " + err));

}



const login = (req, res) => {
  const { email, password } = req.body;
  console.log(password)
  User.findOne({email: email} ).then( data => {
    // console.log(data);
    console.log(req)

      if(data.password === password )
        if(data.status)
        {
          returnData={
            name: data.name,
            photo: data.photo,
            id: data._id,
            
          }
          return res.json({ data: returnData, token:  jwt.sign({ data: data._id }, process.env.TOKEN_SECRET_USER)});

        }
        else
        {
          console.log("not active");
          return res.status(400).json("Your accout has ban. Please contact with the system later");
        }


    console.log("Accout no found !");
    return res.status(404).json("Thông tin không đúng");}  ).catch(err => console.log(err))
};

const sendPasswordToMail = (req, res) => {
  console.log("begin to send")
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => res.json(sendMail(email, "Your Password: ", user.password)))
    .catch((err) =>
      res.status(400).json("Your Email don't belong to our database 😉")
    );
};

const getInfo = (req, res) =>{
  const authHeader = req.headers.authorization;
  if (authHeader){
    const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET_USER, (err, user) => {
            if (err) {
                return console.log(err);
            }

            User.findById(user.data).select("name photo email").then((info) => res.status(200).json(info))
        });
    } else {
        res.sendStatus(401);
  }
}

const updatePass =(req, res) =>{
  const authHeader = req.headers.authorization;
  const {oldPass, newPass} = req.body;
  const token = authHeader.split(' ')[1];

  console.log(oldPass);


  jwt.verify(token, process.env.TOKEN_SECRET_USER, (err, user) => {
      if (err) {
          return console.log(err);
      }

      User.findById(user.data).then((data) => {
        console.log(data.password)
        if(data.password === oldPass)
        {
          console.log("change")
          data.password = newPass;
          data.save().then(()=> res.status(201).json("userUpdate")).catch((err) => res.status(400).json("Error: " + err));
        } 
        else{
          console.log("wrong")
          res.status(201).json({right: false})
        }

       
  
    }).catch((err) => res.status(400).json("Error: " + err));
  })
 

}

const signIn = (req, res) => {

  const user = {
    phone: req.body.phone,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    role: "user",
    photo: "",
    status: true,
    review: [],
    news: [],
  };

  const newUser = new User(user);

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = { login, sendPasswordToMail, signIn, getInfo, updateByUser,updatePass, getUserData};
