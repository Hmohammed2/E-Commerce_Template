"use client";

import { useState } from "react";
import BillingForm from "./BillingForm";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";

export default function CheckoutForm() {
  const [formData, setFormData] = useState<any>({
    billingName: "",
    billingEmail: "",
    billingPhone: "",
    billingAddress1: "",
    billingAddress2: "",
    billingCity: "",
    billingPostcode: "",
    billingCountry: "UK", // default for now
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);

  return (
    <div className="space-y-10">
      <BillingForm formData={formData} setFormData={setFormData} />
      <ShippingForm
        formData={formData}
        setFormData={setFormData}
        sameAsBilling={sameAsBilling}
        setSameAsBilling={setSameAsBilling}
      />
      {/* Pass formData to PaymentForm */}
      <PaymentForm formData={formData} />
    </div>
  );
}
