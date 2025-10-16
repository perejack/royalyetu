import { Shield, Truck, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const Features = () => {
  // Compact feature icons with vibrant color schemes
  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Premium Quality",
      gradient: "from-purple-500 to-indigo-600",
      color: "#8B5CF6"
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Fast Delivery",
      gradient: "from-blue-500 to-cyan-400",
      color: "#3B82F6"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Certified Products",
      gradient: "from-teal-400 to-emerald-500",
      color: "#10B981"
    }
  ];

  return (
    <div className="py-8 px-4">      
      <div className="max-w-3xl mx-auto flex justify-center space-x-5">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <motion.div
              className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-full shadow-lg flex items-center justify-center cursor-pointer relative z-10`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-white">
                {feature.icon}
              </div>
              
              {/* Pulsing circle animation */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-full opacity-30 z-0`}>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.2, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </div>
            </motion.div>
            
            {/* Title below icon */}
            <motion.div 
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              style={{ color: feature.color }}
            >
              {feature.title}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};