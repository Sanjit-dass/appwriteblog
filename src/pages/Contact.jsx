import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({
    from_name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccessMsg("");
  setErrorMsg("");

  // Send main email to you
  emailjs
    .send(
      "service_w62eh1l",        // your service ID
      "template_buarrzi",       // main template (user message to you)
      {
        from_name: form.from_name,
        to_name: "Sanjit Das",
        from_email: form.email,
        to_email: "sanjit9842@gmail.com",
        message: form.message,
      },
      "G1GUQYgdcCt36H_j7"        // your public key
    )
    .then(() => {
      // Send auto-reply to user
      return emailjs.send(
        "service_w62eh1l",        // same service ID
        "template_9aj9g8l",       // your auto-reply template
        {
          from_name: "Sanjit Das",          // you
          to_name: form.from_name,          // user
          email: form.email,                // user's email for reply_to
          message: form.message,            // optional
        },
        "G1GUQYgdcCt36H_j7"
      );
    })
    .then(() => {
      setLoading(false);
      setSuccessMsg("Thank you. I will get back to you as soon as possible.");
      setForm({
        from_name: "",
        email: "",
        message: "",
      });
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      setLoading(false);
      setErrorMsg("Ahh, something went wrong. Please try again.");
    });
};


  return (
    <section className="w-full py-12 px-4 md:px-10 lg:px-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Contact Me
        </h2>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            {successMsg}
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded">
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div>
            <label htmlFor="from_name" className="block mb-1 font-medium text-gray-700 dark:text-white">
              Your Name
            </label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              aria-label="Your Name"
              value={form.from_name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-white">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              aria-label="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium text-gray-700 dark:text-white">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              aria-label="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Type your message here"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-md transition duration-200 ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-10">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.731318737723!2d85.31461077509935!3d27.693799625703803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18f72d7e95a5%3A0xc9b6e3c92d9d2a8a!2sNepal%20SBI%20Bank%20Ltd!5e0!3m2!1sen!2sin!4v1688894729160!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
