"use client";

interface ShippingFormProps {
  formData: any;
  setFormData: (data: any) => void;
  sameAsBilling: boolean;
  setSameAsBilling: (value: boolean) => void;
}

export default function ShippingForm({
  formData,
  setFormData,
  sameAsBilling,
  setSameAsBilling,
}: ShippingFormProps) {
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Shipping Details
        </h2>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={sameAsBilling}
            onChange={(e) => setSameAsBilling(e.target.checked)}
            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 py-2 px-3"
          />
          Same as billing
        </label>
      </div>

      {!sameAsBilling && (
        <div className="space-y-6">
          {/* Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="shippingFirstName"
                value={formData.shippingFirstName || ""}
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
                name="shippingLastName"
                value={formData.shippingLastName || ""}
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
              name="shippingCompany"
              value={formData.shippingCompany || ""}
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
              name="shippingAddress"
              value={formData.shippingAddress || ""}
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
              name="shippingAddress2"
              value={formData.shippingAddress2 || ""}
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
                name="shippingCity"
                value={formData.shippingCity || ""}
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
                name="shippingPostcode"
                value={formData.shippingPostcode || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              name="shippingPhone"
              value={formData.shippingPhone || ""}
              onChange={handleChange}
              placeholder="+44 1234 567890"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
            />
          </div>

          {/* Country (locked to UK) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country/Region
            </label>
            <input
              type="text"
              name="shippingCountry"
              value="United Kingdom"
              readOnly
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-700 shadow-sm sm:text-sm py-2 px-3"
            />
          </div>

          {/* Delivery Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Instructions (optional)
            </label>
            <textarea
              name="shippingNotes"
              value={formData.shippingNotes || ""}
              onChange={handleChange}
              placeholder="e.g. Leave at front door, call upon arrival..."
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2 px-3"
            />
          </div>
        </div>
      )}
    </section>
  );
}
