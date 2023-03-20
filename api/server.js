// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");

const User = require("./users/model");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.post("/api/users", (req, res) => {
  !req.body.name || req.body.bio
    ? res.status(400).json({
        message: "Lütfen kullanıcı için bir name ve bio sağlayın",
      })
    : User.insert(req.body)
        .then((response) => {
          res.status(201).json(response);
        })
        .catch((err) =>
          res
            .status(500)
            .json({ message: "Veritabanına kaydedilirken bir hata oluştu" })
        );
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kullanıcı bilgileri alınamadı", error: err });
  }
});

// server.get("/hobbits", (req, res) => {
//   const hobbits = {
//     id: "a_benzersiz_id", // String, gerekli
//     name: "Jane Doe", // String, gerekli
//     bio: "Having fun", // String, gerekli
//   };

//   res.status(200).json(hobbits);
// });

server.listen(8000, () => console.log("API running on port 8000"));
