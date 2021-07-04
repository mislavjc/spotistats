import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/client';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.scss';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuVariants, textVariants } from '@/lib/framer';

const Navbar = () => {
  const [session, loading] = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className={styles.navWrapper}>
        <div className={styles.nav}>
          <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
          <div className={styles.logo}>
            <Link href="/" passHref>
              <h1>Spotistats</h1>
            </Link>
          </div>
          <div className={styles.links}>
            <Link href="/top-tracks" passHref>
              <h3>Tracks</h3>
            </Link>
            <Link href="/top-artists" passHref>
              <h3>Artists</h3>
            </Link>
          </div>
          <div>
            {session && !loading ? (
              <div className={styles.account}>
                <Image
                  className={styles.avatar}
                  src={session.user.picture}
                  width={40}
                  height={40}
                  alt="user profile picture"
                />
                <h3>Profile</h3>
              </div>
            ) : (
              <h3 className={styles.login} onClick={signIn}>
                Sign in
              </h3>
            )}
          </div>
          <div className={styles.menuIcon} onClick={() => setShowMenu(true)}>
            <Image src="/icons/menu.svg" width={30} height={30} alt="menu icon" />
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.menu}
          >
            <div>
              <motion.h1 variants={textVariants} custom={0} onClick={() => setShowMenu(false)}>
                <Link href="/top-tracks">
                  <a>Top tracks</a>
                </Link>
              </motion.h1>
              <motion.h1 variants={textVariants} custom={1} onClick={() => setShowMenu(false)}>
                <Link href="/top-artists">
                  <a>Top artist</a>
                </Link>
              </motion.h1>
              <motion.h1 variants={textVariants} custom={2}>
                <a href="https://github.com/mislavjc/spotistats">Source code</a>
              </motion.h1>
              <motion.span variants={textVariants} custom={3} className={styles.seperator}>
                &nbsp;
              </motion.span>
              <motion.p variants={textVariants} custom={4}>
                <Link href="/">
                  <a>Account</a>
                </Link>
              </motion.p>
              <motion.p variants={textVariants} custom={5} onClick={() => signOut()}>
                Log out
              </motion.p>
            </div>
            <div className={styles.close} custom={6} onClick={() => setShowMenu(false)}>
              <Image src="/icons/close.svg" width={30} height={30} alt="close" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
