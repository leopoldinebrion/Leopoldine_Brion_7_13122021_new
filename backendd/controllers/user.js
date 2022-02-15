const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models');

exports.signup = async (req, res, next) => {

try {
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const newUser = await db.User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: passwordHash,
          isAdmin: req.body.isAdmin,
        }); 
  res.status(201).send(newUser)
} catch(error) {
    res.status(400).send({ error: error.message })
  }
};

exports.login = async (req, res, next) => {
    
try {
    const user = await db.User.findOne({ where : { email: req.body.email }})
    const checkPassword = await bcrypt.compare(req.body.password, user.password)

    if(!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
    }
    else if(!checkPassword) { 
        return res.status(400).json({error : "Mot de passe incorrect"})
    } else {
        res.status(200).json({
            userId: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            profilImage: user.profilImage,
            isAdmin: user.isAdmin,
            token: jwt.sign(
            { userId: user.id },
            `${process.env.KEY_TOKEN}`,
              { expiresIn: '12h' }
              )
        });
        }
} catch(error) {
    res.status(500).send({ error: "erreur" })
 }
};

exports.getUserProfil = async (req, res, next) => {
    try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] }
    });
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.getAllUsers = (req, res, next) => {
  db.User.findAll({
    attributes: { exclude: ["password"] },
    id: req.params.id
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }))
};

exports.updateUserProfil = async (req, res, next) => {
  try {
  if (req.auth.userId != req.params.id) {
    return res.status(403).json({ message: "utilisateur non autorisé" })
  }
  let user = await db.User.findOne({ where: { id: req.params.id }});
  console.log("req.body : ", req.body);
  const userObject = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    profilImage: req.file,
 }

  if (req.file) {
    userObject.profilImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    user.profilImage = userObject.profilImage;
  }
  user.firstname = userObject.firstname;
  user.lastname = userObject.lastname;

  const uptatedUser = await user.save({ fields: ["firstname", "lastname", "profilImage"] })
  res.status(200).json({ message: "Profil modifié !", user: uptatedUser })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await db.User.findOne({ where: { id: id } });
    if (user.profilImage !== null) {
      const filename = user.profilImage.split("/images")[1];
      fs.unlink(`images/${filename}`, () => {
        // sil' y a une photo on la supprime et on supprime le compte
        db.User.destroy({ where: { id: id } });
        res.status(200).json({ message: "utilisateur supprimé" });
      });
    } else {
      db.User.destroy({ where: { id: id } }); // on supprime le compte
      res.status(200).json({ message: "utilisateur supprimé" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};