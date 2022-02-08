const db = require('../models');
const fs = require('fs');

exports.createPost = async (req, res, next) => {
  try {
    const findUser = await db.User.findOne({ where: { id: req.auth.userId }});
    const newPost = await db.Post.create({
        content: req.body.content,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.imageUrl,
        userId: findUser.id
      });
    post = await db.Post.findOne({ where: {id: newPost.id }, include: [{ 
      model: db.User,
      attributes: ["firstname", "lastname", "id", "profilImage", "isAdmin"]
      }],
     })     
		res.status(201).json({ post });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getOnePost = (req, res, next) => {
    db.Post.findOne({ where: { id: req.params.id }, include: [
      { model: db.User}
    ]
    })
      .then(post => res.status(200).json({ post }))
      .catch(error => res.status(404).json({ error }))
};

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            attributes: ["id", "content", "imageUrl", "createdAt"],
            order : [["createdAt", "DESC"]] ,
            include: [{ 
                model: db.User,
                attributes: ["firstname", "lastname", "id", "profilImage"]
            }],
        });
        res.status(200).send(posts);
    } catch {
        return res.status(500).send({
            error: "Erreur lors de la récupération des posts."
        })
    }
};

exports.modifyPost = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ where: { id: req.auth.userId }})
    let post = await db.Post.findOne({ where: { id: req.params.id }});
    console.log(post)
    if (post.userId == user || user.isAdmin === true) {
      if(req.file) {
        post.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      }
      if(req.body.content) {
      post.content = req.body.content
    }
    const uptatedPost = await post.save({ fields: ["content", "imageUrl"] })
    res.status(200).json({ message: "Post modifié !", post: uptatedPost })
    } else {
      return res.status(400).json({ message : "requête non autorisée" })
    }
  } catch(error) {
    return res.status(500).send({ error: error.message });   
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ where : { id: req.auth.userId }});
    const post = await db.Post.findOne({ where: { id : req.params.id }});
    if(user.isAdmin === true || post.userId === user) {
      if(post.imageUrl) {
        const filename = post.imageUrl.split("/images/")[1]; //extrait le nom du fichier à supprimer
        fs.unlink(`images/${filename}`, () => { //supprime fichier du dossier images
          db.Post.destroy({ where: { id: post.id }});
          res.status(200).json({ message : "Post et image supprimés" });
        });
      } else {
        db.Post.destroy({ where: { id: post.id }});
        res.status(200).json({ message : "Post supprimé" });
      }
    } else {
      res.status(400).json({ message: "Non autorisé"});
    }
  } catch(error) {
    return res.status(500).send({ error: error.message });   
  }
};