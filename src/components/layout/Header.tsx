import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { CodeExportModal } from "@/components/modals/code-export-modal"; // Asegúrate de que exista este componente

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="text-2xl font-bold ml-4 font-headline text-primary">
          RapidUI
        </h1>
        {/* <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          <Code className="mr-2 h-4 w-4" />
          Export Code
        </Button> */}
      </div>
      <CodeExportModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}
