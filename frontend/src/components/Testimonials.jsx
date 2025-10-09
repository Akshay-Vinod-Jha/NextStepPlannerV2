import React from "react";
import { Star, Quote } from "lucide-react";
import founderPhoto from "../assets/FounderPhoto.jpg";

const testimonials = [
  {
    id: 1,
    name: "Priya Deshmukh",
    location: "Mumbai",
    rating: 5,
    text: "The Kalsubai trek was absolutely breathtaking! Being on Maharashtra's highest peak at sunrise was magical. The guides were knowledgeable about the history and ensured everyone's safety. Highly recommend!",
    trek: "Kalsubai Peak Trek",
  },
  {
    id: 2,
    name: "Rahul Patil",
    location: "Pune",
    rating: 5,
    text: "Rajgad fort trek exceeded all expectations! The monsoon views were spectacular and the professional organization made this experience truly unforgettable. The Maratha history shared by guides was fascinating.",
    trek: "Rajgad Fort Trek",
  },
  {
    id: 3,
    name: "Sneha Kulkarni",
    location: "Nashik",
    rating: 5,
    text: "The Harishchandragad trek was challenging yet incredibly rewarding. The Konkan Kada cliff is stunning! Team's expertise and the bonfire at night made it a perfect weekend adventure.",
    trek: "Harishchandragad Trek",
  },
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
            Real experiences from adventurers who have explored Maharashtra's
            magnificent Sahyadri trails with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Quote className="h-8 w-8 text-orange-600 mb-4" />

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              <div className="border-t border-orange-200 pt-4">
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.location}</p>
                <p className="text-orange-600 text-sm font-medium mt-1">
                  {testimonial.trek}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* From the Founders Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pb-12">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              From the <span className="text-orange-600">Founder</span>
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Founder Photo */}
            <div className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={founderPhoto}
                  alt="Girish Kale - Founder of TREKORA Adventures"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Founder Details Card */}
              <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <h3 className="font-bold text-xl text-gray-900">Girish Kale</h3>
                <p className="text-orange-600 font-medium">
                  Founder, TREKORA Adventures
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  B.E. Information Technology, PICT Pune
                </p>
              </div>
            </div>

            {/* Founder Message */}
            <div className="space-y-4 text-gray-700 leading-relaxed order-1 lg:order-2">
              <p className="text-lg font-medium text-gray-900">
                "Hi, I'm Girish Kale, the founder of TREKORA Adventures, where
                passion meets the peaks! ⛰️"
              </p>

              <p>
                Currently pursuing my B.E. in Information Technology from Pune
                Institute of Computer Technology (PICT), I've always believed
                that learning doesn't just happen in classrooms—it happens in
                the mountains, the forests, and on every trail that challenges
                you to grow.
              </p>

              <p>
                What started as my weekend escapes into nature soon turned into
                a vision—to create a community that finds joy, freedom, and
                purpose in exploring the outdoors. At TREKORA Adventures, we
                don't just trek—we seek stories, build memories, and inspire
                courage.
              </p>

              <p className="font-semibold text-gray-900">
                My mission is simple: to help people disconnect from screens,
                reconnect with nature, and experience the thrill of adventure
                safely and sustainably.
              </p>

              <p>
                Join us on a journey where every step tells a story, and every
                peak teaches a lesson. 🌲✨
              </p>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="font-bold text-lg text-gray-900">Girish Kale</p>
                <p className="text-orange-600 font-medium">
                  Founder, TREKORA Adventures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
