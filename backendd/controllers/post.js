const db = require('../models');
const fs = require('fs');

exports.createPost = async (req, res, next) => {
    try {
        const findUser = await db.User.findOne({
            where: { id: req.auth.userId },
        });
        if (!findUser) {
            console.log("User non trouvé!");
        }
        const newPost = await db.Post.create({
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            UserId: req.auth.userId
        });
        if (!newPost) {
			console.log('Il manque des paramètres');
		}
		res.status(200).json({ newPost });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User
        }
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
    const userId = req.auth.userId;
    let post = await db.Post.findOne({ where: { id: req.params.id }});
    
    if (post.UserId == userId) {
      if(req.file) {
        post.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/images")[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Deleted file: upload/${filename}`);
            }
          });
        }
      }
      if(req.body.content) {
      post.content = req.body.content
    }
    const uptatedPost = await post.save({ fields: ["content", "imageUrl"] })
    res.status(200).json({ message: "Post modifié !", post: uptatedPost })
    } else {
      return res.status(400).json({ message : "requête non autorisée" })
    }
  } catch {
    return res.status(500).send({ error: error.message });   
  }


  //   if (req.file) {
  //     postObject.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  //     post.imageUrl = postObject.imageUrl;
  //   }
  //   post.content = postObject.content;

  //   const uptatedPost = await post.save({ fields: ["content", "imageUrl"] })
  //     res.status(200).json({ message: "Post modifié !", post: uptatedPost })
  // } catch (error) {
  //   return res.status(500).send({ error: error.message });   
  // }

    // db.Post.findOne({ where: { id: req.params.id } })
    //   .then((post) => {
    //     if (post.userId == req.auth.userId) {
    //       const postObject = {
    //         content: req.body.content
    //       }
    //       if (req.file) {
    //         postObject.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    //         const filename = post.imageUrl.split("/images/")[1];
    //         fs.unlink(`images/${filename}`, ( error ) => { 
    //         error? console.log(error): console.log("image supprimée");
    //         })
    //       }
    //       console.log(postObject)

    //       post.update(postObject)
    //         .then(() => res.status(200).json({ message: "Post modifié !", }))
    //         .catch((error) => res.status(400).json( error ))
    //     } else {
    //       res.status(403).json({ message: "vous n'êtes pas autorisé" })
    //     }
    //   })
    //   .catch((error) => res.status(500).json( error ))
  };

exports.deletePost = (req, res, next) => {
    db.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.UserId == req.auth.userId) { //l'user est il autorisé ?
        if(req.file) {
          const filename = post.imageUrl.split("/images/")[1]; //on extrait le nom du fichier à supprimer
          fs.unlink(`images/${filename}`, ( error ) => { //unlink pour supprimer un fichier de mon dossier images
            error? console.log(error): console.log("image supprimée");
          })
        }
          post.destroy()
            .then(() => res.status(200).json({ message: "Post supprimé !" }))
            .catch((error) => res.status(400).json( error ))
      } else {
        res.status(404).json({ message: "vous n'êtes pas autorisé" })
      }
    })
    .catch((error) => res.status(500).json( {message: error.message} ))
};