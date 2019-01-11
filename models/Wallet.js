const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  Expenses: [
    {
      type: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        require: true
      },
      note: {
        type: String
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ],
  Income: [
    {
      type: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        require: true
      },
      note: {
        type: String
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = Wallet = mongoose.model("wallet", WalletSchema);
