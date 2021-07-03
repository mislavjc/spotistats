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

export const modalVariants = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -50,
    opacity: 0,
  },
};

export const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};