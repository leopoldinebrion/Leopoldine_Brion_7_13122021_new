const db = require ("../models")

exports.createComment = async (req, res, next) => {
    try {
        const newComment = await db.Comment.create({
            content: req.body.content,
            postId: req.params.postId,
            userId: req.auth.userId
        })
        comment = await db.Comment.findOne({ where: {id: newComment.id }, include: db.User })
        res.status(201).json({ comment });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({ where: { id: req.params.commentId } })
    .then((comment) => {
        if(comment.userId == req.auth.userId ) {
            comment.destroy()
                .then(() => res.status(200).json({ message: "commentaire supprimé" }))
                .catch((error) => res.status(400).json(error));
        } else {
            res.status(404).json({ message: "vous n'êtes pas autorisé à supprimer ce commentaire" })
        }
    })
    .catch((error) => res.status(500).json({ message: error.message }))   
    // try {
    //     const commentId = { where : { id: req.params.commentId }};    
    //     const user = await db.User.findOne({ where : { id: res.locals.token.userId }});
    //     const comment = await db.Comment.findOne({ where : { commentId }});
    //     if(comment.UserId == userToken) {
    //         await comment.destroy()
    //         return res.status(200).json({ message: "Commentaire supprimé" });
    //     }
    // } catch (error) {
    //     return res.status(500).send({ error: error.message });
    // }
};

exports.getComments = (req, res, next) => {
    db.Comment.findAll({
        where: { PostId : req.params.postId },
        include: [db.Post, {
            model: db.User,
            attributes: ["lastname", "firstname", "profilImage"]
        }],
        order : [["createdAt", "DESC"]]
    })

    .then(comments => {
        if(comments) {
            return res.status(200).json(comments)
        } else {
            return res.status(400).json({ message : "pas de commentaire sur ce post" });
        }
    })
    .catch(error => res.status(500).json({ error : error.message }));
};