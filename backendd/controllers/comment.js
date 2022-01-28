const db = require ("../models")

exports.createComment = async (req, res, next) => {

    // try {
    //     const user = await db.User.findOne({ where: { id: req.auth.userId }});
    //     const newComment = await db.Comment.create({
    //         userId : user,
    //         postId: req.params.id,
    //         content: req.body.content
    //     });
    //     const comment = await models.Comment.findOne({
    //         where: { id: newComment.id },
    //       });
    //       return res.status(201).json(comment);
    //     } catch (error) {
    //       res.status(500).json({ error: "error" });
    //     }


    try {
        const newComment = await db.Comment.create({
            content: req.body.content,
            PostId: req.params.id,
            UserId: req.auth.userId
        })
        res.status(201).json({ newComment, message: "commentaire publié" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}