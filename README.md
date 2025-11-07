# Quickly create your React Application

Are you tired of setting up the same React project configuration over and over again? Spending precious development time on boilerplate setup, configuring build tools, and integrating UI libraries? We've all been there.

`create-vrt` is here to save you time and hassle. It's a zero-config CLI tool that scaffolds a production-ready React application with all the modern tools you need, right out of the box. No more copying configurations from old projects or hunting through documentation – just run one command and start building your app.

Stop wasting time on setup! Start building faster.

![Home](https://raw.githubusercontent.com/binhnguyen00/juliette/refs/heads/main/assets/home.png)

## What's Included?

- **Vite⚡**
- **React**
- **Tailwind**
- **[HeroUI](https://www.heroui.com/)** - Beautiful, accessible component library build on top of Tailwind

**📦 Pre-configured** - Everything wired up and ready to use

Whether you're prototyping a new idea, starting a client project, or just want to experiment without the setup overhead, create-vrt gets you from zero to coding in seconds.

## Project Structure

```plaintext
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── DefaultLayout.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── index.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Page.tsx
│   │   └── index.ts
│   ├── css/
│   │   └── index.css
│   ├── index.tsx         # Application entry point
│   ├── Application.tsx   # Route configuration
│   └── Providers.tsx     # HeroUI + other providers configuration
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
├── package.json
└── dockerfile
```

## Installation
```bash
npm install -g create-vrt@latest
```

## Create a new project
```bash
create-vrt
```