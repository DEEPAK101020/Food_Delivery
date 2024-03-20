const mongoose = require("mongoose");

const menuItems = mongoose.Schema({
    name: {
        type: {type:String},
      },
      description: {type:String},
      price: {
        type: {type:Number},
      },
      image: String
    });

const restSchema = mongoose.Schema({
    name: {
        type: {type:String},

      },
      address: {
        street: {
          type: {type:String},
        },
        city: {
          type: {type:String},
        },
        state: {
          type: {type:String},
        },
        country: {
          type: {type:String},
        },
        zip: {
          type: {type:String},

        }
      },
      menu: [menuItems]

})
const RestaurantModel = mongoose.model('Restaurant', restSchema);

module.exports={
    RestaurantModel
}