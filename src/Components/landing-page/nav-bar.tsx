import { Button } from "../ui/button";
import { ListChecks, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Container from "../containers/main-container";
import { ModeToggle } from "../theme/toggel";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <Container className="fixed top-0 w-full bg-white shadow-sm z-50">
      <Container className="container mx-auto px-4 py-6">
        <Container className="flex items-center justify-between">
          <Container className="flex items-center space-x-2">
            <ListChecks className="h-6 w-6 text-[var(--taskmandu-primary)]" />
            <span className="text-xl font-bold text-[var(--taskmandu-primary)]">
              Taskmandu
            </span>
          </Container>

          {/* Mobile menu button */}
          <Button
            className="md:hidden p-2 text-[var(--taskmandu-primary)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop navigation */}
          <Container className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
            >
              About
            </Link>
            <Link
              href="#pricing"
              className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
            >
              Pricing
            </Link>
            <ModeToggle />
          </Container>

          <Container className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-[var(--taskmandu-primary)]">
              Login
            </Link>
          </Container>
        </Container>

        {/* Mobile menu */}
        {isMenuOpen && (
          <Container className="md:hidden py-4 space-y-4">
            <Container className="flex flex-col space-y-3">
              <Link
                href="#features"
                className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
              >
                About
              </Link>
              <Link
                href="#pricing"
                className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#pricing"
                className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
              >
                Pri
              </Link>
            </Container>
            <Container className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
              <Button
                variant="ghost"
                className="text-[var(--taskmandu-primary)] w-full"
              >
                Login
              </Button>
            </Container>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default Navbar;
