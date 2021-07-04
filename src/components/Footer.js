import styles from '@/styles/Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.footer__grid}>
          <div>
            <h4>Tech stack</h4>
            <p>
              <a href="https://nextjs.org/">Next.js</a>
            </p>
            <p>
              <a href="https://sass-lang.com/">SCSS</a>
            </p>
            <p>
              <a href="https://www.framer.com/motion/">Framer Motion</a>
            </p>
          </div>
          <div>
            <h4>Useful links</h4>
            <p>
              <a href="https://github.com/mislavjc/spotistats">Github link</a>
            </p>
            <p>
              <a href="https://github.com/mislavjc/spotistats#readme">Documentation</a>
            </p>
            <p>
              <a href="https://developer.spotify.com/documentation/">Spotify API</a>
            </p>
          </div>
          <div>
            <h4>Issue tracker</h4>
            <p>
              <a href="https://github.com/mislavjc/spotistats/issues">Report issues on Github</a>
            </p>
          </div>
        </div>
        <div>
          <h2>Spotistats &copy;2021</h2>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
