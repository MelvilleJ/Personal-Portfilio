import React, { useState } from "react";
import { motion } from "framer-motion";

function CONTACT() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // To show confirmation or error
  const [loading, setLoading] = useState(false);

  const webhookUrl = import.meta.env.VITE_WEBHOOKURL;

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      setStatus("Please fill out all fields.");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      // Handle webhook response (adjust field if needed)
      let reply = data.output || "Thank you for your message!";
      reply = reply.replace(/^"(.*)"$/, "$1").replace(/\\u2019/g, "’");

      setStatus(reply);

      // Clear form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("Error sending message. Please contact me via email or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-b from-green-50 to-green-500 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 lg:p-12 max-w-4xl w-full mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2">
            Got a challenge?
          </h1>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-4 bg-white rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400"
                id="name"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="w-full p-4 bg-white rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400"
                id="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <textarea
              className="w-full p-4 bg-white rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400 resize-none"
              id="message"
              name="message"
              placeholder="Tell us about your challenge..."
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="button"
              className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-12 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>

          {status && (
            <div className="text-center mt-4 text-gray-800 font-medium">
              {status}
            </div>
          )}
        </div>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Let's solve it!
          </h2>
          <p className="text-gray-600 mt-2">
            We'll get back to you within 24 hours
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default CONTACT;
