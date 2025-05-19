import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'motion/react';

const CountUp = ({ targetNumber }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        if (count < targetNumber) {
          setCount((prevCount) => Math.min(prevCount + Math.ceil(targetNumber / 100), targetNumber));
        } else {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [inView, targetNumber, count]);

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {count.toLocaleString()}
    </motion.span>
  );
};

export default CountUp

