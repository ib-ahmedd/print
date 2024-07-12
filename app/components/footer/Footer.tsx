import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-site-blue text-white">
      <section className="flex-col sm:flex-row flex-wrap gap-8 py-20">
        <div>
          <h3>Custom Print Store</h3>
          <span className="flex gap-8">
            <a href="http://instagram.com" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="http://x.com" target="_blank">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="http://linkedin.com" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="http://facebook.com" target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </span>
        </div>

        <div>
          <h3>
            Get in Touch with Us for the Best Quality Custom Prints & Supplies.
          </h3>
          <p>
            Qui dolore ipsum quia dolor sit amet, consec tetur adipisci velit,
            sed quia non numquam eius modi tempora incidunt lores ta porro ame.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <div>
            <Link href="/about">Know More About Us</Link>
            <Link href="/shop">Visit Store</Link>
            <Link href="/contact">Let's Connect</Link>
          </div>
        </div>

        <div>
          <h3>Important Links</h3>
          <div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms and Conditions</Link>
          </div>
        </div>
      </section>

      <section className="flex-col sm:flex-row items-center justify-between py-12 text-sm border-t border-slate-700">
        <p>Copyright © {new Date().getFullYear()} | Custom Printing</p>
        <p>Powered By Custom Printing</p>
      </section>
    </footer>
  );
}

export default Footer;
