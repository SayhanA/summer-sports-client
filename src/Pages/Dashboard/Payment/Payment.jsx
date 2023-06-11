import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);

const Payment = () => {
    const [cart] = useCart()
    const total = cart.reduce( (sum, item) => sum + item.price,0)

    return (
        <div className="w-full md:px-32 rounded-lg">
            <h3>Payment component</h3>
            <div className="bg-white p-10 rounded-xl max-w-[500px] mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm cart={cart} price={total}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;