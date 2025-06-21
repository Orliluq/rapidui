# 🚀 RapidUI

¡Bienvenido a **RapidUI**!  
El playground visual donde tus ideas de UI cobran vida en segundos y la IA te regala el código listo para copiar y pegar.  
¿Cansado de escribir `<div>` tras `<div>`? ¡Arrastra, suelta, edita y deja que la magia suceda!

---

## 🤖 ¿Qué es RapidUI?

RapidUI es un generador visual de interfaces de usuario (UI) potenciado por IA.  
- Arrastra componentes (botones, inputs, cards, imágenes, headings, párrafos, etc.) a un canvas.
- Personaliza sus propiedades en tiempo real.
- Haz clic en "Generar Código" y obtén el código React + TailwindCSS listo para usar.
- ¡Copia y pégalo en tu proyecto favorito!

Ideal para prototipado rápido, inspiración de layouts, y para quienes aman ver resultados inmediatos.

---

## 🧩 Características

- **Editor visual drag & drop**: Construye tu UI como si jugaras con bloques.
- **Propiedades editables**: Cambia textos, colores, tamaños y más.
- **Generación de código con IA**: Obtén código limpio, moderno y funcional.
- **Vista previa instantánea**: Ve cómo quedará tu UI antes de exportar.
- **Componentes personalizables**: Añade, elimina y reordena elementos fácilmente.
- **Licencia MIT**: ¡Úsalo, modifícalo y compártelo libremente!

---

## 🗂️ Estructura del Proyecto

```
src/
  ├── ai/                # Flujos y prompts de IA (Genkit)
  ├── app/               # Entrypoint Next.js y estilos globales
  ├── components/
  │     ├── editor/      # Lógica del editor visual y generación de código
  │     ├── layout/      # Header, Footer, etc.
  │     └── ui/          # Componentes UI reutilizables (botón, card, etc.)
  ├── hooks/             # Custom hooks (ej: use-toast)
  ├── types/             # Tipos TypeScript
  └── ...
```

---

## 🖼️ Diagrama UML Interactivo

```mermaid
flowchart TD
    A[Usuario] -->|Arrastra| B[ComponentLibrary]
    B --> C[Canvas]
    C --> D[PropertiesPreviewTabs]
    D -->|Edita props| C
    C --> E[GeneratedCodePanel]
    E -->|Genera código| F[AI (Genkit)]
    F -->|Devuelve código| E
    E -->|Copia| G[Portapapeles]

    subgraph UI
        B
        C
        D
        E
    end
```

> Puedes visualizar este diagrama en [Mermaid Live Editor](https://mermaid.live).

---

## 🛠️ ¿Cómo lo uso?

1. Clona el repo y ejecuta:
   ```bash
   npm install
   npm run dev
   ```
2. Abre [http://localhost:3000](http://localhost:3000)
3. ¡Arrastra componentes, edita, genera código y sé feliz!

---

## 📝 Licencia

MIT License.  
Hecho con 💙 por Orli Dun y la comunidad.  
¡Contribuciones y PRs son bienvenidos!

---
