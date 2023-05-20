const UserModel = require("../models/user.model");

module.exports.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
};

module.exports.getUser = async (req, res) => {
  const user = await UserModel.findOne({ pseudo: req.params.pseudo });

  if (!user) {
    res.status(400).json({ message: "Cet utilisateur n'existe pas" });
  }

  res.status(200).json(user);
};

module.exports.setUser = async (req, res) => {
  if (!req.body.pseudo) {
    res.status(400).json({ message: "Veuillez renseigner un pseudo" });
  } else if (!req.body.email) {
    res.status(400).json({ message: "Veuillez renseigner un email" });
  } else if (!req.body.password) {
    res.status(400).json({ message: "Veuillez renseigner un mot de passe" });
  }

  const user = await UserModel.create({
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: req.body.password,
    jeuxListe: req.body.jeuxListe,
    profil: req.body.profil,
    nbPartie: req.body.nbPartie,
    nbPerso: req.body.nbPerso,
  });
  res.status(200).json(user);
};

module.exports.editUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "Cet utilisateur n'existe pas" });
  }

  const updateUser = await UserModel.findByIdAndUpdate(user, req.body, {
    new: true,
  });

  res.status(200).json(updateUser);
};

module.exports.deleteUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "Ce user n'existe pas" });
  }
  await user.deleteOne({ _id: user });
  res.status(200).json("Message supprimé " + req.params.id);
};
