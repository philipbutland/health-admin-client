import React from "react";

const Footer = () => {
  return (
    <footer class="site-footer">
      <div>
        <div>
          <div>
            <h6>About</h6>
            <p class="text-justify">
              <i>Health Admin Project </i> this full-stack project provides a
              powerful and intuitive health admin platform that improves the
              patient and doctor experience. By using React and Node.js, the
              platform is fast, reliable, and secure, making it an excellent
              choice for healthcare providers who want to streamline their
              operations and provide better care to their patients.
            </p>
          </div>
          <div>
            <p class="copyright-text">
              Copyright &copy; 2023 All Rights Reserved by
              <a href="https://health-admin.netlify.app/">
                {" "}
                <span>
                  <b>Health Admin Team</b>
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
