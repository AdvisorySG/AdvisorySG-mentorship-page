import React, { useRef, useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import { advisoryMentorshipLogo } from "../components/assets";
import Logo from "../components/Logo";
import Page from "../components/Page.tsx";
import "../styles/Header.css";
import "../styles/App.css";
import Statistics from "../components/Statistics.tsx";

const testimonials = [
  {
    person: "Mr. Randell Sie",
    type: "Mentor",
    role: "Managing Director",
    company: "Persistensie Pte Ltd",
    text: "“I've benefitted from mentorship tremendously in my career. You gain new perspectives, experience and a friendly ear who will not judge. The job of a mentor is to listen and extend your thinking, then let you make the final decision and own it.”",
  },
  {
    person: "Ms. Clarinda Ong",
    type: "Mentee",
    school: "Tampines Meridian Junior College",
    text: "“Going into this, I thought I knew what career I wanted. With my mentor's advice and guidance, and Advisory's thought-provoking worksheets, however, I discovered what better suited me. I used to be extremely unsure of my future, so I'm very glad this experience helped me shed light on my path forward. I have learnt more about myself and gained insights into what I want to do professionally.”",
  },
];

const images = [
  {
    index: "",
    label1: "Mentor: Randall Sie",
    imgPath1: "/mentor-randallsie.png",
  },
  {
    index: "",
    label1: "Mentee: Clarinda Ong",
    imgPath1: "/mentee-clarindaong.png",
  },
];

const statistics = [
  {
    title: "Mentors",
    value: 2000,
    icon: "mdi:account",
  },
  {
    title: "Mentees",
    value: 200,
    icon: "mdi:school",
  },
  {
    title: "Industries",
    value: 48,
    icon: "mdi:domain",
  },
  {
    title: "Hours of Mentorship",
    value: 8000,
    icon: "mdi:clock-time-four-outline",
  },
];

const Index = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  const glideRef = useRef(null);

  let glideTestimonial;

  function initializeGlide() {
    glideTestimonial = new Glide(glideRef.current, {
      type: "carousel",
      autoplay: 10000,
      perView: 1,
      breakpoints: {
        576: { perView: 1 },
        768: { perView: 1 },
        992: { perView: 1 },
        1200: { perView: 1 },
        1400: { perView: 1 },
      },
    });

    glideTestimonial.on(["mount.after", "run"], function () {
      glideTestimonial.update({ perView: 1 });
    });

    glideTestimonial.mount();

    document
      .querySelector(".glide__arrow--left")
      .addEventListener("click", function () {
        glideTestimonial.go("<");
      });

    document
      .querySelector(".glide__arrow--right")
      .addEventListener("click", function () {
        glideTestimonial.go(">");
      });
  }

  function destroyGlide() {
    if (glideTestimonial && glideTestimonial.root) {
      glideTestimonial.destroy();
    }
  }

  function debounce(func, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }

  const refreshGlide = debounce(function () {
    destroyGlide(); // Clear any past instance
    initializeGlide();
  }, 500);

  useEffect(() => {
    refreshGlide();
    return () => destroyGlide();
  }, []);

  const debouncedResize = debounce(function () {
    if (glideTestimonial) {
      glideTestimonial.update({
        breakpoints: {
          576: { perView: 1 },
          768: { perView: 1 },
          992: { perView: 1 },
          1200: { perView: 1 },
          1400: { perView: 1 },
        },
        animationDuration: 800,
      });
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      destroyGlide();
    };
  }, [debouncedResize]);

  return (
    <Page>
      <div className="logo-and-intro-container container">
        <img
          className="header-mentorship-logo container"
          src={advisoryMentorshipLogo}
          alt="Advisory Mentorship Programme"
        />
        <div className="header-mentorship-intro container text-lg" id="aboutus">
          <p>
            The Advisory Mentorship Programme pairs students with working
            professionals in their fields of interest on a 1-1 basis. Over the
            course of four months, mentors give an hour each month to meet with
            their mentee.
          </p>
        </div>
      </div>
      <h2>Our Impact</h2>
      <Statistics stats={statistics} />
      <h2>Our Partner Organisations</h2>
      <Logo />
      <h2>Testimonials</h2>
      <Box
        ref={glideRef}
        className="testimonal-carousel container glide"
        style={{
          position: "relative",
          paddingLeft: isSmall ? "25px" : "90px",
          maxWidth: 900,
          flexGrow: 1,
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {testimonials.map((testimonial, index) => (
              <li key={index} className="glide__slide">
                <Grid
                  container
                  sx={{
                    width: "100%",
                    justifyContent: isSmall ? "center" : "flex-start",
                  }}
                  spacing={2}
                  alignItems="center"
                >
                  <Grid item>
                    <Box
                      component="div"
                      sx={{
                        height: isSmall ? "150px" : "250px",
                        width: isSmall ? "150px" : "250px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={images[index].imgPath1}
                        alt={images[index].label1}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={isSmall ? 12 : 7}>
                    <div style={{ paddingBottom: "20px" }}>
                      <strong>{testimonial.person}</strong>
                      <span
                        style={{
                          background: "var(--brand-color)",
                          marginLeft: "0.5rem",
                          padding: "5px",
                          borderRadius: "100px",
                        }}
                      >
                        {testimonial.type}
                      </span>
                      {testimonial.type === "Mentor" ? (
                        <>
                          <div style={{ paddingTop: "10px" }}>
                            <p>
                              {testimonial.role}
                              <br />
                              {testimonial.company}
                            </p>
                          </div>
                          <div style={{ textAlign: "left" }}>
                            {testimonial.text}
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ paddingTop: "10px" }}>
                            <p>{testimonial.school}</p>
                          </div>
                          <div style={{ textAlign: "left" }}>
                            {testimonial.text}
                          </div>
                        </>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </li>
            ))}
          </ul>
        </div>
      </Box>
      <div
        className="glide__arrows"
        data-glide-el="controls"
        style={{ position: "relative" }}
      >
        <button
          className="glide__arrow glide__arrow--left"
          data-glide-dir="<"
          style={{
            background: "transparent",
            border: "none",
            fontSize: "24px",
            color: "var(--brand-color)",
            margin: "10px",
            marginLeft: isSmall ? "12.5%" : "25%",
            position: "absolute",
          }}
        >
          {"<"}
        </button>
        <button
          className="glide__arrow glide__arrow--right"
          data-glide-dir=">"
          style={{
            background: "transparent",
            border: "none",
            fontSize: "24px",
            color: "var(--brand-color)",
            margin: "10px",
            position: "absolute",
            marginRight: isSmall ? "12.5%" : "25%",
          }}
        >
          {">"}
        </button>
      </div>
    </Page>
  );
};

export default Index;
