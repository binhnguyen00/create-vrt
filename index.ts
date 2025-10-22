#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";

import { execSync } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("What is your project name? ", (projectName: string) => {
  const dir = path.join(process.cwd(), projectName)

  if (fs.existsSync(dir)) {
    console.error(`Directory "${projectName}" already exists.`)
    rl.close()
    process.exit(1)
  }

  console.log("Cloning project template... ⏳")

  try {
    execSync(`git clone https://github.com/binhnguyen00/juliette ${projectName}`, { stdio: "inherit" })

    const gitDir = path.join(dir, ".git")
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true })
    }

    console.log(`Project "${projectName}" created successfully! ✅`)
    console.log(`Location: ${dir} 📁`)
  } catch (ex) {
    console.error("Failed to clone repository:", ex.message)
    process.exit(1)
  } finally {
    rl.close()
  }
})
