const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.new_user = (req, res) => {
  const gender = req.query.gender;
  axios
    .get("https://randomuser.me/api", { params: { gender: gender } })
    .then((user) => {
      const data = user.data.results[0];

      const dd = {
        name: `${data.name.first} ${data.name.last}`,
        email: data.email,
        gender: data.gender,
        img: data.picture.large,
      };

      res.render("add_user", { user: dd });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error retreive data from API" });
    });
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
