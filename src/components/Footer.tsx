
import { Twitter, Github, MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border/60 backdrop-blur-sm bg-card/30">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-5">
            <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CryptoVerse
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Earn crypto by playing games, trading, and governing. Join 250K+ users earning daily rewards.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" },
                { icon: MessageCircle, href: "#" },
                { icon: Mail, href: "#" }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="w-11 h-11 rounded-xl glass-effect border border-border/60 flex items-center justify-center hover:border-primary/60 hover:bg-primary/10 transition-all group"
                  >
                    <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold mb-5 text-foreground text-lg">Platform</h4>
            <ul className="space-y-3">
              {[
                { name: "Gaming", to: "/gaming" },
                { name: "DeFi Trading", to: "/defi" },
                { name: "NFT Marketplace", to: "/nft-marketplace" },
                { name: "Launchpad", to: "/launchpad" }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.to} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-5 text-foreground text-lg">Resources</h4>
            <ul className="space-y-3">
              {["Documentation", "API Access", "Security Audit", "Help Center"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-5 text-foreground text-lg">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Join Our Team", "News & Updates", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-medium text-center sm:text-left">
            © {currentYear} CryptoVerse Hub. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
