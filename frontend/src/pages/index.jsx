import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/Index.css";

export default function Index() {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate("/login");

  return (
    <div>
      <Navbar />
      <section className="hero-section">
        <p>An AI-Powered Wedding Planner</p>
        <button className="primary-btn hero-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </section>

      {/* Customer Testimonials Section */}
      <section className="testimonials-section bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#678894] mb-4">
            Our Satisfied Customers
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            See what couples are saying about their experience with WEDLY
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#678894] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  S
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">Sarah & Michael</h3>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "WEDLY made planning our wedding so much easier! The AI assistant helped us stay organized and on budget. Couldn't have done it without this amazing tool!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#678894] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  P
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">Priya & Raj</h3>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Absolutely love this platform! The checklist feature kept us on track, and the itinerary planner was a lifesaver. Our wedding day was perfect!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#678894] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  E
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">Emma & James</h3>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The best wedding planning tool out there! Simple, intuitive, and the AI suggestions were spot-on. Highly recommend to all couples!"
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#678894] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  L
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">Lisa & David</h3>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "WEDLY transformed our wedding planning experience! Everything was so organized, and we never missed a deadline. Thank you for making our day stress-free!"
              </p>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#678894] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  A
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">Aisha & Omar</h3>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "From budget tracking to vendor management, WEDLY had it all! The user interface is beautiful and easy to use. 10/10 would recommend!"
              </p>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#678894] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  M
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800">Maria & Carlos</h3>
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This app is a game-changer! Planning our destination wedding was seamless thanks to WEDLY. The AI assistant answered all our questions instantly!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
