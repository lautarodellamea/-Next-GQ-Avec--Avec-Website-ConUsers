import { Metadata } from "next";
import { ContactForm } from "@/components";


export const metadata: Metadata = {
  title: 'Contacto',
}


export default function ContactPage() {
  return (
    <div className="top-separator relative">
      <ContactForm />
    </div>
  );
}