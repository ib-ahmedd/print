import { ContactForm, Hello } from "./components";

function Contact() {
  return (
    <main>
      <section className="hero_section flex-col md:flex-row items-center py-20">
        <Hello />
        <ContactForm />
      </section>
    </main>
  );
}

export default Contact;
