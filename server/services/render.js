const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      console.log(response.data);
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

exports.new_user = (req, res) => {
  axios
    .get("https://randomuser.me/api/")
    .then((user) => {
      let data = user.data.results[0];

      let dd = {
        name: data.name.first,
        email: data.email,
        gender: data.gender,
        status: data.name.first,
      };
      console.log(data);
      res.render("add_user", { user: dd });
      //res.send(data);
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
