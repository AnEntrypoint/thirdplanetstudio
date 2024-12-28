import { cn } from "@/lib/utils";
import { Link } from "./ui/link";

const navItems = [
  { name: "Bands", href: "#bands" },
  { name: "Events", href: "#events" },
  { name: "Online", href: "#online" },
  { name: "Contact Us", href: "#contact" },
];

export function Navigation({ className }: { className?: string }) {
  return (
    <nav className={cn("flex gap-8 text-lg font-medium", className)}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          variant="nav"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}