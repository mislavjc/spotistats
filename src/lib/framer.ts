export const cardVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: (index: number) => ({
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

export const menuVariants = {
  hidden: {
    x: 400,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.25,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: 400,
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.25,
      delayChildren: 0.1,
    },
  },
};

export const textVariants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: index * 0.015,
      type: 'tween',
      duration: 0.4,
    },
  }),
  exit: {
    x: 400,
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.5,
    },
  },
};

export const opacityVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};