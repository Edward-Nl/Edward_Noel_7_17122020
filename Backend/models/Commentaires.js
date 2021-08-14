module.exports = (sequelize, DataTypes) => {
    const Commentaires = sequelize.define("Commentaires", {
      commentaire: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    })
  
    return Commentaires;
  };