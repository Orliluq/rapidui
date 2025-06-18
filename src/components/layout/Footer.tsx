export default function Footer() {
    return (
      <footer className="border-t">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RapidUI. All rights reserved. Developed by Orli Dun. Built with Next.js and ShadCN UI.</p>
        </div>
      </footer>
    );
  }