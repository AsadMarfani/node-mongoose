var mongoose = require('mongoose'),
  assert = require('assert');
var Dishes = require('./models/dishes-1');
var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  Dishes
    .create({
      name: "Chicken Handi",
      description: "Discount available."
    }, function (err, dish) {
      if (err)
        throw err;
      console.log("Dish Created!");
      console.log(dish);
      var dishId = dish._id;
      setTimeout(function () {
        Dishes.findByIdAndUpdate(dishId, {
          $set: {
            description: "Updated dish available."
          }
        }, {new: true})
          .exec(function (err, dish) {
            if (err)
              throw err;
            console.log("Updated Dish");
            console.log(dish);
          });
      }, 3000)
    });
});