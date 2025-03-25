import React from "react";
import { Col, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

const WorkExperience = () => {
  const experienceData = [
    {
      role: "Blockchain Architect and Lead",
      company: "WeiBlocks",
      duration: "March 2024 – Present",
      responsibilities: [
        "Architected and implemented scalable, secure blockchain solutions by designing robust ecosystems, authoring smart contracts, and integrating blockchain with existing systems.",
        "Developed an AI-powered sniper bot on the Solana blockchain, leveraging advanced algorithms for detecting security threats and executing autonomous trades.",
      ],
    },
    {
      role: "Blockchain Lead",
      company: "Ahmad Software and Solutions",
      duration: "Sep 2023 – Feb 2024",
      responsibilities: [
        "Led impactful blockchain projects, including 'Allocate,' a treasury solution optimizing financial operations, and 'NFTyART,' an NFT marketplace bridging physical art and blockchain technology.",
        "Oversaw the development of an asset-swapping escrow platform, authored smart contracts, and directed strategic planning and implementation.",
      ],
    },
    {
      role: "Associate Software Engineer",
      company: "WeiBlocks",
      duration: "March 2023 – Aug 2023",
      responsibilities: [
        "Developed decentralized applications (DApps) and Miner Extractable Value (MEV) bots, including an Escrow DApp for secure transactions with NFTs, ERC-20 tokens, and native tokens.",
        "Conducted in-depth research on decentralized exchanges (DEXs), offering insights into models and security measures.",
      ],
    },
  ];

  return (
    <Row style={{ justifyContent: "center", padding: "10px" }}>
      <Col md={12}>
        <h1 className="project-heading mb-5">
          <strong className="purple">Work Experience</strong>
        </h1>
        {experienceData.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="experience-card"
          >
            <div className="experience-icon">
              <FaBriefcase size={30} className="purple" />
            </div>
            <div className="experience-details">
              <h3>{exp.role}</h3>
              <h4>{exp.company}</h4>
              <p className="duration">{exp.duration}</p>
              <div className="responsibilities-list">
                {exp.responsibilities.map((responsibility, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="responsibility-item"
                  >
                    <span className="responsibility-bullet">•</span>
                    <span>{responsibility}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </Col>
    </Row>
  );
};

export default WorkExperience;