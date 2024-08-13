import { motion } from 'framer-motion';

export const BackgroundGradient = () => {
  return (
    <div className='grid absolute w-full -z-50'>
      <motion.div
        className='absolute -z-10 w-[30rem] h-[30rem] dark:bg-[#00054A] bg-[#88C7FF] rounded-full filter blur-3xl self-end justify-self-start -inset-20'
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 20,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className='absolute -z-10 w-[20rem] h-[20rem] dark:bg-[#3B004A] bg-[#E2A9FF] rounded-full filter blur-3xl self-start -inset-14'
        animate={{
          x: ["100%", "0%", "100%"],
          y: ["100%", "0%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 25,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className='absolute -z-10 w-[30rem] h-[30rem] dark:bg-[#3B004A] bg-[#E2A9FF] rounded-full filter blur-3xl self-end justify-self-end -inset-20'
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["100%", "0%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 30,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};