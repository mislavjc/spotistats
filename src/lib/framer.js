export const cardVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: index => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.01,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};