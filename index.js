#!/usr/bin/env node

const fs = require("fs");
const ora = require("ora");
const path = require("path");
const readline = require("readline");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);
const REPO_URL = "https://github.com/binhnguyen00/juliette";
const args = process.argv.slice(2);

if (args.includes("--version") || args.includes("-v")) {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "./package.json"), "utf8"));
  console.log(pkg.version);
  process.exit(0);
}

function ask(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  try {
    const projectName = await ask(
      "What is your project name? (name / 'enter' to setup on current directory)\n > "
    );

    const isEmptyProjectName = !projectName;
    const projectDir = isEmptyProjectName
      ? path.join(process.cwd())
      : path.join(process.cwd(), projectName);
    const gitDir = path.join(projectDir, ".git");

    if (!isEmptyProjectName) {
      if (fs.existsSync(projectDir)) {
        console.info(`Directory "${projectName}" already exists.`);
        const files = fs.readdirSync(projectDir).length;
        if (files !== 0) {
          console.error(`Directory "${projectName}" is not empty! Found ${files} files. skipped.`);
          process.exit(1);
        }
      }
    }

    const spinner = ora("Preparing template...").start();
    if (isEmptyProjectName) {
      await execAsync(`git clone ${REPO_URL}`);
      fs.cpSync(path.join(process.cwd(), "juliette"), projectDir, { recursive: true });
      fs.rmSync(path.join(process.cwd(), "juliette"), { recursive: true, force: true });
    } else {
      await execAsync(`git clone ${REPO_URL} ${projectName}`);
    }
    spinner.succeed("Preparing template...\n");

    if (!fs.existsSync(projectDir)) {
      spinner.fail("Failed to prepare template");
      process.exit(1);
    }

    fs.rmSync(path.join(projectDir, ".vscode"), { recursive: true, force: true });
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
      fs.rmSync(path.join(projectDir, ".gitignore"), { force: true });
    }

    spinner.start("Installing dependencies...");
    await execAsync("npm install", { cwd: projectDir });
    spinner.succeed("Installing dependencies...\n");

    spinner.start("Building project...");
    await execAsync("npm run build", { cwd: projectDir });
    spinner.succeed("Building project...\n");

    if (isEmptyProjectName) {
      console.log(`Project created successfully! ✅\n`);
    } else {
      console.log(`Project "${projectName}" created successfully! ✅\n`);
    }
    console.log(`Location: ${projectDir} 📁\n`);

    const answer = await ask("Do you want to run the project? (y/n) ");
    if (answer.toLowerCase() === "y") {
      spinner.start("\nRunning project...");
      await execAsync("npm run dev", { cwd: projectDir, stdio: "inherit" });
      spinner.succeed("Running project...");
    } else {
      console.log("Skipped running\n");
      console.log("Your project is ready! 🌱\n");
    }

    process.exit(0);

  } catch (error) {
    console.error("Failed to setup project:", error.message);
    process.exit(1);
  }
}

main();