import './Contact.css';

const Contact = () => {

  return (
    <section className="contact" id="Contact">  
        <h2 className="contact-title">Contact Us</h2>
        <form className="contact-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit" className="btn-primary" onSubmit={() => {
              alert("Message sent successfully!");
            }}>Send Message</button>
        </form>
    </section>
  );
};

export default Contact;