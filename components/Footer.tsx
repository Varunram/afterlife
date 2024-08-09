// components/Footer.tsx
import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer flex justify-between items-center p-10">
      <div className="footer-left">
        <a href="https://www.joinwarp.com">
          <Image src="/warp.svg" alt="Warp Logo" width={50} height={30} className="logo" />
        </a>
      </div>
      <div className="footer-center">
        © 2024 Warp · 169 Madison Ave, #2298, New York City, NY 10016
      </div>
      <div className="footer-right flex space-x-2">
        <a href="https://x.com/joinwarp">
          <Image src="/images/x-social.webp" alt="Twitter" width={30} height={30} />
        </a>
        <a href="https://www.linkedin.com/company/joinwarp/">
          <Image src="/images/linkedin-social.webp" alt="LinkedIn" width={30} height={30} />
        </a>
        <a href="mailto:contact@joinwarp.com">
          <Image src="/images/email-social.webp" alt="Email" width={30} height={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
