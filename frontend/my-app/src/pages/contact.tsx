import { useState } from "react";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle form submission (e.g., API call)
    console.log("Form submitted:", formData);
    // Optionally reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10 mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
      <p className="text-gray-600 mb-6">
        Have questions or feedback? Fill out the form below and we'll get back to you soon.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-32"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
