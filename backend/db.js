const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://karanpalan007:7pLEVZi924aPpdIE@cluster0.q977rka.mongodb.net/?retryWrites=true&w=majority"
);

// Can add more constraints or Use Zod
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  fName: String,
  lName: String,
});

const User = mongoose.model("User", userSchema);
module.exports({
  User,
});
