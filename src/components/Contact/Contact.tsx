import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Linkedin, Github } from 'lucide-react'; // Ensure all Lucide icons are imported
import './Contact.css'; // Make sure this CSS import is present and correct

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  // REPLACE THIS WITH YOUR ACTUAL FORMSPREE FORM ENDPOINT URL
  const FORMSPREE_FORM_ENDPOINT = 'https://formspree.io/f/xldnypkg'; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch(FORMSPREE_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        const errorData = await response.json();
        console.error('Formspree Error:', errorData);
        setStatus(`Failed to send message: ${errorData.errors ? errorData.errors.map((err: any) => err.message).join(', ') : 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setStatus('Failed to send message. Please check your internet connection.');
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "work.antonyhyson@gmail.com",
      link: "mailto:work.antonyhyson@gmail.com"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "London, United Kingdom",
      link: null
    },
    {
      icon: <Linkedin size={24} />,
      title: "LinkedIn",
      value: "antonyhysonseltran",
      link: "https://www.linkedin.com/in/antonyhysonseltran"
    }
  ];

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <motion.div
          // Added Framer Motion variants and useInView for animation
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to collaborate or discuss cybersecurity opportunities? Let's connect!
            </p>
          </motion.div>

          <div className="contact-content">
            <motion.div className="contact-info">
              <h3 className="contact-info-title">Contact Information</h3>
              <p className="contact-info-description">
                Feel free to reach out for collaborations, opportunities, or just to have a conversation about cybersecurity.
              </p>
              
              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="contact-info-item"
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="contact-info-icon">{info.icon}</div>
                    <div className="contact-info-content">
                      <h4 className="contact-info-label">{info.title}</h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-info-value link"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="contact-info-value">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/antonyhysonseltran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/Antonyhyson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <Github size={20} />
                </a>
                <a
                  href="mailto:work.antonyhyson@gmail.com"
                  className="social-link"
                >
                  <Mail size={20} />
                </a>
              </div>
            </motion.div>

            <motion.div 
                className="contact-form-container"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
            >
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input" /* ADDED THIS CLASS */
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input" /* ADDED THIS CLASS */
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input" /* ADDED THIS CLASS */
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea" /* ADDED THIS CLASS */
                    rows={5} // Adjusted rows to match original Contact.css min-height for textarea
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary form-submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'Sending...'} // Ensure disabled status is applied
                >
                  <Send size={18} />
                  {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                </motion.button>
                {status && status !== 'Sending...' && (
                  <p className={`form-status ${status.includes('successfully') ? 'success' : 'error'}`}>
                    {status}
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;