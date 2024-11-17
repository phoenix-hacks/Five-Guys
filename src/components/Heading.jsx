import React from 'react';
import './heading.css';
import { motion } from 'framer-motion';

const Heading = () => {
  return (
    <motion.div 
      className="heading-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <img src="https://devitcity.com/wp-content/uploads/2022/09/Profile-1.png" alt="Profile" />
      <h2>User Name</h2>
    </motion.div>
  );
};

export default Heading;
