import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import { advisoryLogo, advisoryMentorshipLogo } from "../assets";

import "./header.css";

const NavBar = () => (
  <div className="nav">
    <a className="nav-back-to-main-site" href="https://advisory.sg">
      <IoIosArrowBack className="nav-arrow-icon" />
      back to main site
    </a>
    <img className="nav-logo" src={advisoryLogo} alt="Advisory" />
  </div>
);

const Header = () => (
  <div className="header">
    <NavBar />
    <div className="header-bottom">
      <img
        className="header-mentorship-logo"
        src={advisoryMentorshipLogo}
        alt="Advisory Mentorship Programme"
      />
      <div className="header-mentorship-intro">
        <p>
          With the spread of COVID-19, and as many students face concerns,
          frustration and uncertainty about their studies, graduation, and
          career opportunities - Advisory is looking to support affected
          students. By matching students aged 16-25 with industry mentors from
          their field of interest one-to-one on a three-month basis from July to
          September, we hope to assist students to make informed career choices,
          and provide students with support and advice in these uncertain times.
        </p>
        <p>
          <small>
            All Mentors have the rights to privacy and non-harassment that must
            be respected. You are hereby informed not to misrepresent your
            relationship or affiliation with Advisory in any way and on any
            platform, if and when you communicate with any mentors. Failing
            which you accept that you have been informed and therefore
            understand that legal action may be taken against you.
          </small>
        </p>
        <p>
          Click{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://advisorysg.typeform.com/to/Q5iHzn#source=mentorsite"
          >
            here
          </a>{" "}
          to apply as a mentee.
        </p>
        <p>
          Click{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/file/d/1w7zlMuGY_7hVXeW0LaNKXWWjLRt3ic4G/view?usp=sharing"
          >
            here
          </a>{" "}
          to view the application guide on CVs and resumes.
        </p>
        <p>
          Click{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/file/d/1aA3l_WQ1ehGO8UBKuRFLqj4URpQbAVzN/view?usp=sharing"
          >
            here
          </a>{" "}
          to view a sample application response.
        </p>
      </div>
    </div>
  </div>
);

export default Header;
