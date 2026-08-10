"use client";

import styles from "./contact.module.css";

// Preserved exactly as the original: this doesn't actually send anywhere yet
// (no backend wired up) — submitting just confirms via alert, same as today.
export default function ContactForm() {
  return (
    <div className={styles.formPanel}>
      <p className={styles.formTitle}>Send a Message</p>
      <p className={styles.formSub}>All serious enquiries receive a reply within 48 hours.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Message sent! We will get back to you within 48 hours.");
        }}
      >
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Full Name <span className={styles.req}>*</span></label>
            <input type="text" name="name" placeholder="Your name" required />
          </div>
          <div className={styles.formGroup}>
            <label>Email Address <span className={styles.req}>*</span></label>
            <input type="email" name="email" placeholder="you@example.com" required />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="+1..." />
          </div>
          <div className={styles.formGroup}>
            <label>Enquiry Type <span className={styles.req}>*</span></label>
            <select name="type" defaultValue="" required>
              <option value="" disabled>Select type...</option>
              <option value="General Enquiry">General Enquiry</option>
              <option value="Media / Press">Media / Press</option>
              <option value="Brand Partnership">Brand Partnership</option>
              <option value="Booking Request">Booking Request</option>
              <option value="Fan Message">Fan Message</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Box Battle">Box Battle Application</option>
            </select>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Message <span className={styles.req}>*</span></label>
          <textarea name="message" rows={5} placeholder="Tell us about your enquiry..." required></textarea>
        </div>
        <button type="submit" className={styles.submitBtn}>Send Message</button>
      </form>
    </div>
  );
}
