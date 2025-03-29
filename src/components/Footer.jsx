import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-6 px-6 flex flex-col items-center space-y-4">
            <div className="flex space-x-6">
                <a href="#" className="hover:opacity-80 transition">
                    <Facebook size={24} />
                </a>
                <a href="#" className="hover:opacity-80 transition">
                    <Instagram size={24} />
                </a>
                <a href="#" className="hover:opacity-80 transition">
                    <Twitter size={24} />
                </a>
                <a href="#" className="hover:opacity-80 transition">
                    <Youtube size={24} />
                </a>
            </div>

            <div className="text-sm">
                &copy; {new Date().getFullYear()} StayQuest. All rights
                reserved.
            </div>
        </footer>
    );
}

export default Footer;
