let friends = require("../data/friends");

module.exports = app => {
  app.get("/api/friends", (req, res) => {
    res.json(friends);
  });

  app.post("/api/friends", (req, res) => {
    let totalDifference = 0;

    let bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    let userData = req.body;
    let userName = userData.name;
    let userScores = userData.scores;

    let b = userScores.map(item => {
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: b
    };

    console.log("Name: " + userName);
    console.log("User Score " + userScores);

    let sum = b.reduce((a, b) => a + b, 0);

    console.log("Sum of users score " + sum);
    console.log("Best match friend diff " + bestMatch.friendDifference);
    console.log("+++++++=================++++++++++");

    for (let i = 0; i < friends.length; i++) {
      console.log(friends[i].name);

      totalDifference = 0;

      console.log("Total Diff " + totalDifference);

      console.log("Best match friend diff " + bestMatch.friendDifference);

      let bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);

      console.log("Total friend score " + bfriendScore);

      totalDifference += Math.abs(sum - bfriendScore);

      console.log("-------------------------> " + totalDifference);

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }

      console.log(totalDifference + " Total Difference");
    }
    console.log(bestMatch);

    friends.push(userData);

    console.log("New user added");

    console.log(userData);

    res.json(bestMatch);
  });
};
