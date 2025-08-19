import { Phone, MessageCircle } from 'lucide-react';

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 space-y-3">
      <a
        href="https://wa.me/5531999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-accent-500 text-white p-3 rounded-full shadow-lg hover:bg-accent-600 transition-all duration-300 hover:scale-110 block"
        title="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      <a
        href="tel:+5531999999999"
        className="bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 hover:scale-110 block"
        title="Ligar"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default FloatingContact;
