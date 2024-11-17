import React from 'react';
import { motion } from 'framer-motion';
import Heading from './Heading';
import './SideBar.css';

const SideBar = ({ items }) => {
  return (
    <motion.div
      className="sidebar-container"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Heading />
      <ul>
        {items.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SideBar;
