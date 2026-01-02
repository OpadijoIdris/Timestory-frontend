import { Link } from "react-router-dom";

const PaymentError = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2 text-red-600">Payment Failed ❌</h1>
      <p className="mb-4">
        Unfortunately, your payment could not be processed. Please try again or
        use a different payment method.
      </p>
      <Link
        to="/checkout"
        className="inline-block mt-4 bg-black text-white px-6 py-2 rounded"
      >
        Retry Payment
      </Link>
    </div>
  );
};

export default PaymentError;