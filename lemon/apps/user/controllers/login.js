const User = require("../../../database/models/users");
const nodemailer = require("nodemailer");

const sendMail = async (user, subject, body) => {
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

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findOne({ email }, { password })
    .then((user) => res.json(user._id))
    .catch((err) => res.status(400).json("err, Hack?? 😣"));
};

const sendPasswordToMail = (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => res.json(sendMail(email, "Your Password: ", user.password)))
    .catch((err) =>
      res.status(400).json("Your Email don't belong to our database 😉")
    );
};

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

module.exports = { login, sendPasswordToMail, signIn };
