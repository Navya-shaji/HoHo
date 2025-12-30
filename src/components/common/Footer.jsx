function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>🎄 SantaVerse - Spreading Christmas Joy Around the World 🎄</p>
                <p>&copy; {currentYear} SantaVerse. Made with ❤️ and festive magic ✨</p>
                <div className="footer-links">
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <a href="#privacy">Privacy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
