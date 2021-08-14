const { Commentaires } = require('../models')

// Récupère tout les commentaires d'un post 
exports.allCommentaires = (req, res, next) => {
    const PostId = req.params.id;
    Commentaires.findAll({where: { PostId: PostId}})
        .then(image => res.status(200).json(image))
        .catch(error => res.status(400).json({error}))
};

// Créer un commentaire
exports.createCommentaires = async (req, res, next) => {
    const commentaire = req.body;
    await Commentaires.create(commentaire)
        .then(image => res.status(200).json(image))
        .catch(error => res.status(400).json({error}))
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res, next) => {
    const id = req.params.id;
    await Commentaires.destroy({ where: { id: id } })
    .then(() => res.status(200).json("Commentaire supprimé"))
    .catch(error => res.status(400).json({error}))
  }