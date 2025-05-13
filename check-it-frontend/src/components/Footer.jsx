import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-6 mt-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo y nombre */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-light text-gray-800">Check It!</h2>
                        <p className="text-xs text-gray-500 mt-1">Minimalist task management</p>
                    </div>
                    
                    {/* Links simples */}
                    <div className="flex space-x-6">
                        <a 
                            href="#" 
                            className="text-gray-500 hover:text-gray-800 text-sm transition-colors"
                        >
                            Terms
                        </a>
                        <a 
                            href="#" 
                            className="text-gray-500 hover:text-gray-800 text-sm transition-colors"
                        >
                            Privacy
                        </a>
                        <a 
                            href="#" 
                            className="text-gray-500 hover:text-gray-800 text-sm transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                    
                    {/* Iconos sociales (opcional) */}
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <FaGithub size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <FaTwitter size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <FaLinkedin size={18} />
                        </a>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Check It! App. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}