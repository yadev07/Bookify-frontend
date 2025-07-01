import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkblack-900 via-darkblack-800 to-primarygreen-50">
      <div className="absolute inset-0 bg-gradient-to-r from-darkblack-700/10 to-primarygreen-600/10"></div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-darkblack-600 to-primarygreen-600">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkblack-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkblack-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkblack-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkblack-500 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-darkblack-600 to-primarygreen-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-darkblack-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">support@bookify.com</p>
                      <p className="text-gray-600">info@bookify.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">+91 93018XXXXX</p>
                      <p className="text-gray-600">+91 70677XXXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primarygreen-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">
                        123 Business Street<br />
                        Suite 456<br />
                        Dabhara, Sakti<br />
                        Chhattisgarh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Follow Us</h2>
                <p className="text-gray-600 mb-6">
                  Stay connected with us on social media for the latest updates and news.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-darkblack-600 rounded-full flex items-center justify-center hover:bg-darkblack-700 transform hover:scale-110 transition-all duration-300"
                  >
                    <FaFacebook className="text-white text-xl" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transform hover:scale-110 transition-all duration-300"
                  >
                    <FaTwitter className="text-white text-xl" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transform hover:scale-110 transition-all duration-300"
                  >
                    <FaInstagram className="text-white text-xl" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-darkblack-700 rounded-full flex items-center justify-center hover:bg-darkblack-800 transform hover:scale-110 transition-all duration-300"
                  >
                    <FaLinkedin className="text-white text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our platform.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How do I book an appointment?
              </h3>
              <p className="text-gray-600">
                Simply browse our services, select a provider, choose your preferred time slot, and confirm your booking. It's that easy!
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Can I cancel or reschedule my appointment?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time through your dashboard.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How do I become a service provider?
              </h3>
              <p className="text-gray-600">
                Register as a provider, complete your profile, and submit your verification documents. We'll review and approve your account within 2-3 business days.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Is my payment information secure?
              </h3>
              <p className="text-gray-600">
                Absolutely! We use industry-standard encryption and security measures to protect all your payment and personal information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 