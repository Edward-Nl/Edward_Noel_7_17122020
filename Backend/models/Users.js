module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adminAccount: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        basicAccount: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "avatar.png"
          },
          data: {
            type: DataTypes.BLOB("long"),
          },
    });


    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
          onDelete: "cascade",
        });

        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Commentaires, {
            onDelete: "cascade",
        });
      };
  
    return Users;
  };