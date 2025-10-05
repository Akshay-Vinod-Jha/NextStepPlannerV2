import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Roopkund trek was absolutely magical! The guides were incredibly knowledgeable about the local culture and ensured our safety throughout. The views were beyond words!",
    trek: "Roopkund Trek"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    text: "Valley of Flowers exceeded all expectations. The professional organization and attention to detail made this once-in-a-lifetime experience truly unforgettable.",
    trek: "Valley of Flowers"
  },
  {
    id: 3,
    name: "Anjali Patel",
    location: "Bangalore",
    rating: 5,
    text: "The Chadar Trek was the most challenging yet rewarding experience of my life. The team's expertise in extreme conditions was remarkable. Highly recommended!",
    trek: "Chadar Trek"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What <span className="text-orange-600">Trekkers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from adventurers who have explored India's magnificent trails with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Quote className="h-8 w-8 text-orange-600 mb-4" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-orange-200 pt-4">
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.location}</p>
                <p className="text-orange-600 text-sm font-medium mt-1">{testimonial.trek}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* From the Founders Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pb-12">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 md:p-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              From the <span className="text-orange-600">Founders</span>
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              Namaste, fellow adventurers!
            </p>
            
            <p>
              At <span className="font-semibold text-gray-900">Trekora</span>, we believe that the mountains are not just destinations—they're transformative experiences that shape who we are. Born from a deep love for Maharashtra's stunning Sahyadri ranges, we've dedicated ourselves to making these incredible landscapes accessible to everyone.
            </p>
            
            <p>
              What started as weekend treks with friends has grown into a community of passionate trekkers who share our vision: to explore responsibly, trek safely, and preserve the natural beauty of our beloved Maharashtra for generations to come.
            </p>
            
            <p className="font-semibold text-gray-900">
              Every trail we choose, every route we plan, and every safety measure we implement comes from years of experience and an unwavering commitment to your adventure and well-being.
            </p>
            
            <p>
              We're not just trek organizers—we're your companions on this incredible journey. Let's create memories that last a lifetime!
            </p>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="font-bold text-xl text-gray-900">
                Happy Trekking! 🏔️
              </p>
              <p className="mt-2 italic text-gray-600">
                - The Trekora Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;