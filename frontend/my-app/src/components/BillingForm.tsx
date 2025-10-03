"use client";

interface BillingFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function BillingForm({
  formData,
  setFormData,
}: BillingFormProps) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Billing Details
      </h2>
      <div className="space-y-6">
        {/* Full Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="billingFirstName"
              value={formData.billingFirstName || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="billingLastName"
              value={formData.billingLastName || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
            />
          </div>
        </div>

        {/* Company (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company (optional)
          </label>
          <input
            type="text"
            name="billingCompany"
            value={formData.billingCompany || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
          />
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address Line 1
          </label>
          <input
            type="text"
            name="billingAddress"
            value={formData.billingAddress || ""}
            onChange={handleChange}
            required
            placeholder="House number and street name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
          />
        </div>

        {/* Address Line 2 (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address Line 2 (optional)
          </label>
          <input
            type="text"
            name="billingAddress2"
            value={formData.billingAddress2 || ""}
            onChange={handleChange}
            placeholder="Apartment, suite, unit, etc."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
          />
        </div>

        {/* City & Postcode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="billingCity"
              value={formData.billingCity || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postcode
            </label>
            <input
              type="text"
              name="billingPostcode"
              value={formData.billingPostcode || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="billingEmail"
              value={formData.billingEmail || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone (optional)
            </label>
            <input
              type="tel"
              name="billingPhone"
              value={formData.billingPhone || ""}
              onChange={handleChange}
              placeholder="+44 1234 567890"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
            />
          </div>
        </div>

        {/* Country (locked to UK) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country/Region
          </label>
          <input
            type="text"
            name="billingCountry"
            value="United Kingdom"
            readOnly
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-700 shadow-sm sm:text-sm py-2 px-3"
          />
        </div>
      </div>
    </section>
  );
}
