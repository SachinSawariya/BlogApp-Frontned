import ContactForm from "@/components/Contacts/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Gyanvora team. We're here to help with your AI and development inquiries.",
  openGraph: {
    title: "Contact Us | Gyanvora",
    description: "Get in touch with the Gyanvora team.",
    url: "https://gyanvora.vercel.app/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
