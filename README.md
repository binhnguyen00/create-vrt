# Quickly create your React Application

Are you tired of setting up the same React project configuration over and over again? Spending precious development time on boilerplate setup, configuring build tools, and integrating UI libraries? We've all been there.

**create-vrt** is here to save you time and hassle. It's a zero-config CLI tool that scaffolds a production-ready React application with all the modern tools you need, right out of the box. No more copying configurations from old projects or hunting through documentation – just run one command and start building your app.

## What's Included?

- **⚡ Vite** - Lightning-fast build tool and dev server
- **⚛️ React** - The UI library you know and love
- **🎨 Tailwind** - Utility-first CSS framework for rapid styling
- **📦 HeroUI** - Beautiful, accessible component library build on top of Tailwind

**📦 Pre-configured** - Everything wired up and ready to use

Whether you're prototyping a new idea, starting a client project, or just want to experiment without the setup overhead, create-vrt gets you from zero to coding in seconds.

## 📁 Project Structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── DefaultLayout.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── index.ts
│   ├── pages/            # Route page components
│   │   ├── Home.tsx
│   │   ├── Page.tsx
│   │   └── index.ts
│   ├── css/              # Global styles
│   │   └── index.css
│   ├── Application.tsx   # Route configuration
│   └── Provider.tsx      # HeroUI provider configuration
│   ├── index.tsx         # Application entry point
├── index.html
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
├── postcss.config.js     # PostCSS configuration
├── package.json          # Dependencies and scripts
└── dockerfile            # Docker configuration
```

## Installation
```bash
npm install -g create-vrt@latest
```

## Create a new project
```bash
create-vrt
```
**or**
```bash
npm exec create-vrt
```

That's it! Your development environment is ready. Just follow the prompts, and you'll have a fully configured React application in moments.

---

**Stop wasting time on setup. Start building faster with create-vrt.**
