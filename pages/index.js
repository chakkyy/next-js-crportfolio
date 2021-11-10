import { useEffect, useState, useRef } from "react";
import { projectsList } from "../components/data";
import Head from "next/head";
import IntroOverlay from "../components/introOverlay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const projectsRef = useRef(null);
  const scrollRef = useRef(null);

  const completeAnimation = () => {
    setAnimationComplete(true);
    document.body.style.overflowY = "auto";
  };

  const executeScroll = () => projectsRef.current.scrollIntoView();

  useEffect(() => {
    // Inner Page height for mobile devices
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // GSAP animation
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline();
    let projects = gsap.utils.toArray(".project");
    let mediaQuery = window.matchMedia("(min-width: 967px)");

    const homeAnimation = (animation) => {
      tl.to(".ball", {
        duration: 2,
        y: "100vh",
        ease: "bounce.out",
      })
        .to(".ball", {
          duration: 1,
          scale: 30,
          ease: "power3.out",
          onComplete: animation,
        })
        .from(".after-animation", {
          duration: 0.8,
          opacity: 0,
          ease: "power3.out",
        })
        .from(".title", {
          duration: 0.5,
          y: 100,
          delay: 0.2,
          opacity: 0,
          ease: "power3.out",
        })
        .from(".peep-image", {
          duration: 0.5,
          y: 100,
          opacity: 0,
          ease: "power3.out",
        })
        .from(".job-title", {
          duration: 0.5,
          y: 100,
          opacity: 0,
          ease: "power3.out",
        })
        .from(".scroll-indicator", {
          duration: 0.5,
          y: 100,
          opacity: 0,
          ease: "power3.out",
        });

      if (mediaQuery.matches) {
        projects.forEach((project) => {
          let tlProject = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top center",
              end: "center center",
              scrub: 1,
            },
          });
          let projectImage = project.querySelector("img");
          let projectInfo = project.querySelector(".project-info");

          tlProject
            .from(projectImage, {
              x: -300,
              opacity: 0,
            })
            .from(projectInfo, {
              x: 300,
              opacity: 0,
            });
        });
      } else {
        projects.forEach((project) => {
          let tlProject = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top center",
              end: "center center",
              scrub: 1,
            },
          });
          let projectImage = project.querySelector("img");
          let projectInfo = project.querySelector(".project-info");

          tlProject
            .from(projectImage, {
              y: 100,
              opacity: 0,
            })
            .from(projectInfo, {
              y: 100,
              opacity: 0,
            });
        });
      }

      let tlFooter = gsap.timeline({
        scrollTrigger: {
          trigger: "footer",
          start: "top center",
          end: "top top",
          scrub: 1,
        },
      });

      tlFooter
        .from("footer h2", {
          y: 100,
          opacity: 0,
          duration: 0.6,
        })
        .from("footer .footer-links", {
          y: 100,
          opacity: 0,
          duration: 0.6,
        });
    };

    homeAnimation(completeAnimation);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
      ref={scrollRef}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Frontend Developer portfolio for Carlos Ramirez."
        ></meta>
        <title>Carlos Ramirez | Frontend Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {animationComplete === false && <IntroOverlay />}
      <div className="after-animation">
        <nav className="home-nav">
          <div className="space-between">
            <Link href="/">
              <div className="logo">CR</div>
            </Link>

            <ul className="nav-list">
              <li>
                <motion.a
                  href="https://drive.google.com/file/d/19StscuAe5AXw8Gha7BNNQcnG7zsP5MBv/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Download Carlos's Resume"
                >
                  Resume
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://github.com/chakkyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Go to Carlos's GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                  <span className="header-hidden-text">GitHub</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://www.linkedin.com/in/carlosramirezdev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Connect with Carlos on LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                  <span className="header-hidden-text">LinkedIn</span>
                </motion.a>
              </li>
            </ul>
          </div>
        </nav>
        <main className="main-home">
          <div className="cta">
            <h1 className="title">
              I create <span className="playful">playful</span> experiences.
            </h1>
            <img
              src="/images/MyPeep.png"
              alt="My Peep"
              className="peep-image"
            />
          </div>

          <h3 className="job-title">
            <span className="text-reveal">
              Carlos Ramirez | Frontend Developer
            </span>
          </h3>
          <button className="scroll-indicator" onClick={executeScroll}>
            <span>Projects</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </main>
        <div className="project-container" ref={projectsRef}>
          {projectsList.map(
            ({ name, description, image, link, GitHub, tools, index }) => (
              <div className="project" key={index}>
                <Link href={link}>
                  <Tilt tiltMaxAngleX="5" tiltMaxAngleY="5">
                    <motion.img
                      className="project-image"
                      src={image}
                      alt={name}
                    />
                  </Tilt>
                </Link>
                <div className="project-info">
                  <Link href={link}>
                    <h3>{name}</h3>
                  </Link>
                  {description.split("\n").map((str, index) => (
                    <p key={index}>{str}</p>
                  ))}
                  <h4>Tools used:</h4>
                  <ul className="tools-list">
                    {tools.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <motion.div className="project-btns">
                    <motion.a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={`Open site of ${name}`}
                    >
                      <motion.button className="project-btn">
                        Open Site
                      </motion.button>
                    </motion.a>
                    {GitHub && (
                      <motion.a
                        href={GitHub}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={`View Code for ${name}`}
                      >
                        <motion.button className="project-btn">
                          View Code
                        </motion.button>
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            )
          )}
        </div>
        <footer>
          <h2 className="playful">Connect with Me</h2>
          <ul className="footer-links">
            <li>
              <motion.a
                href="https://drive.google.com/file/d/19StscuAe5AXw8Gha7BNNQcnG7zsP5MBv/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Download Carlos's Resume"
              >
                Resume
              </motion.a>
            </li>
            <li>
              <motion.a
                href="https://github.com/chakkyy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Go to Carlos's GitHub"
              >
                <FontAwesomeIcon icon={faGithub} size="2x" />
                <span className="footer-hidden-text">GitHub</span>
              </motion.a>
            </li>
            <li>
              <motion.a
                href="https://www.linkedin.com/in/carlosramirezdev/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Connect with Carlos on LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                <span className="footer-hidden-text">LinkedIn</span>
              </motion.a>
            </li>
          </ul>
        </footer>
      </div>
    </motion.div>
  );
}
