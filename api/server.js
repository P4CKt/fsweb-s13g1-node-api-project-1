// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");

const userModel = require("./users/model");

const server = express();

server.use(express.json());

// server.get("/", (req, res) => {
//   res.send("Hello World");
// });

server.post("/api/users", (req, res) => {
  let user = req.body;
  if (!user.name || !user.bio)
    res.status(400).json({
      message: "Lütfen kullanıcı için bir name ve bio sağlayın",
    });
  else
    userModel.insert(user).then((newUser) => {
      res.status(201).json(newUser);
    });
});

server.get("/api/users", async (req, res) => {
  try {
    let users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      let updatedRecord = req.body;
      if (!updatedRecord.name || !updatedRecord.bio)
        res
          .status(400)
          .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
      else {
        let updatedUser = await userModel.update(req.params.id, updatedRecord);
        res.status(200).json(updatedUser);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      await userModel.remove(req.params.id);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});
module.exports = server;
