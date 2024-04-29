import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    trxID: {
      type: String,
    },
    paymentID: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);
const PaymentModel = mongoose.model("payments", paymentSchema);

export default PaymentModel; // Export the model for use in other parts of the application
