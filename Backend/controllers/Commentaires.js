const { Commentaires } = require('../models')


exports.allCommentaires = (req, res, next) => {
    const PostId = req.params.id;
    Commentaires.findAll({where: { PostId: PostId}})
        .then(image => res.status(200).json(image))
        .catch(error => res.status(400).json({error}))
};

exports.createCommentaires = async (req, res, next) => {
    const commentaire = req.body;
    await Commentaires.create(commentaire)
        .then(image => res.status(200).json(image))
        .catch(error => res.status(400).json({error}))
};

exports.deleteCommentaire = async (req, res, next) => {
    const id = req.params.id;
    await Commentaires.destroy({ where: { id: id } });
    res.json("DELETED SUCCESSFULLY");
  }