
import { Shield, Users, Compass, Camera, Tent, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const services = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Expert Guides",
    description: "Experienced local guides with deep knowledge of terrain, culture, and safety protocols"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Safety First",
    description: "Comprehensive safety equipment, first aid training, and emergency evacuation support"
  },
  {
    icon: <Tent className="h-8 w-8" />,
    title: "Premium Equipment",
    description: "High-quality trekking gear, tents, and equipment provided for all adventures"
  },
  {
    icon: <Compass className="h-8 w-8" />,
    title: "Route Planning", 
    description: "Customized itineraries based on fitness level, preferences, and seasonal conditions"
  },
  {
    icon: <Camera className="h-8 w-8" />,
    title: "Photography Tours",
    description: "Specialized photography expeditions to capture Sahyadri's most scenic landscapes and forts"
  },
  {
    icon: <Map className="h-8 w-8" />,
    title: "Cultural Immersion",
    description: "Authentic village stays and explore Maratha heritage with local communities"
  }
];

const Services = () => {
  const navigate = useNavigate();
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive trekking services designed to make your Sahyadri adventure safe, memorable, and extraordinary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-orange-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="text-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;