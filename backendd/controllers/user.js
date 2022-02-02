const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
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
    res.status(400).send({ error: "erreur" })
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

// exports.updateUserProfil = (req, res) => {
//   const id = req.params.id;
//   db.User.findByPk(id)
//     .then((exist) => {
//       if (exist) {
//         if (req.file) {
//           profilImage = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
//         }
//         db.User.update(req.body, { where: { id: req.params.id } })
//           .then(() => {
//             res.status(201).json({ message: 'Profil modifié.' });
//           })
//           .catch(() => {
//             return res.status(500).json({ error: 'Il y a une erreur.' });
//           });
//       } else {
//         return res.status(404).json({ error: 'UserId ' + id + ' non trouvé.' });
//       }
//     })
//     .catch(() => {
//       return res.status(500).json({ error: 'Erreur serveur' });
//     });
// };

exports.updateUserProfil = async (req, res, next) => {
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
  // .catch((error) => res.status(500).json( error ))
  // db.User.update(userObject, { where: { id: req.params.id } })
  //   .then((userUpdated) => res.status(200).json({ message: "Profil modifié !", user: userObject }))
  //   .catch((error) => res.status(500).json( error ))
};


module.exports.deleteUser = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { id: req.params.id }});
    if(user.id === req.auth.userId) {
      if (user.profilImage !== null) {
        const filename = user.profilImage.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          db.User.destroy({ where: { id: req.params.id }});
          res.status(200).json({ message: "Utilisateur et photo supprimés"})
        });
      } else {
        db.User.destroy({ where: { id: req.params.id }})
        res.status(200).json({ message: "Utilisateur supprimé"})
      }
    } else {
      return res.status(403).json({ message: "utilisateur non autorisé à supprimer ce compte" })
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};