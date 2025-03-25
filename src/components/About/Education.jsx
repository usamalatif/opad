import React from "react";
import { Col, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
  const educationData = [
    {
      degree: "BS Computer Science",
      institution: "COMSATS University Islamabad",
      duration: "March 2020 – Feb 2024",
      courses: [
        "Parallel and Distributed Computing",
        "Machine Learning",
        "Object-Oriented Programming (OOP)",
        "Data Structures",
        "Business Intelligence",
        "Design & Analysis of Algorithms",
        "Database Structures & Management",
      ],
    },
  ];

  return (
    <Row style={{ justifyContent: "center", padding: "10px" }}>
      <Col md={12}>
        <h1 className="project-heading mb-5">
          <strong className="purple ">Education</strong>
        </h1>
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="education-card"
          >
            <div className="education-icon">
              <FaGraduationCap size={30} className="purple" />
            </div>
            <div className="education-details">
              <h3>{edu.degree}</h3>
              <h4>{edu.institution}</h4>
              <p className="duration">{edu.duration}</p>
              {/* <div className="courses-list">
                {edu.courses.map((course, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="course-item"
                  >
                    <span className="course-bullet">•</span>
                    <span>{course}</span>
                  </motion.div>
                ))}
              </div> */}
            </div>
          </motion.div>
        ))}
      </Col>
    </Row>
  );
};

export default Education;