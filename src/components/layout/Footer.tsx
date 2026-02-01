import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">DESY</span>
            <span className="text-muted-foreground text-sm">
              — Decision Intelligence Platform
            </span>
          </div>
          
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/decisions/new" className="hover:text-foreground transition-colors">
              New Decision
            </Link>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DESY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
