#!/usr/bin/env node
const fs = require("fs");
const ora = require("ora");
const path = require("path");
const readline = require("readline");
const { execSync } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});

const runProjectOrNot = (pathToProject) => {
  const _rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  _rl.question("Do you want to run the project? (y/n) ", (answer) => {
    _rl.close();
    if (answer.toLowerCase() === "y") {
      let spinner = ora("Running project...").start();
      execSync(`cd ${pathToProject} && npm run dev`, { stdio: "ignore" });
      spinner.succeed("Running project...\n");
    }
    else {
      console.log("Skipped running\n");
      console.log("Your project is ready! 🌱\n");
    }
    process.exit(0);
  });
};

rl.question("What is your project name? (name / 'enter' to setup on current directory) \n > ", (projectName) => {
  const isEmptyProjectName = !projectName;
  const projectDir = isEmptyProjectName
    ? path.join(process.cwd())
    : path.join(process.cwd(), projectName);
  const gitDir = path.join(projectDir, ".git");

  if (!isEmptyProjectName) {
    if (fs.existsSync(projectDir)) {
      console.info(`Directory "${projectName}" already exists.`);

      const files = fs.readdirSync(projectDir).length;
      const isEmptyDir = files === 0;
      if (!isEmptyDir) {
        console.error(`Directory "${projectName}" is not empty! Found ${files} files. skipped.`);
        rl.close();
        return;
      }
    }
  }

  try {
    const spinner = ora("Preparing template...").start();

    if (isEmptyProjectName) {
      execSync(`git clone https://github.com/binhnguyen00/juliette`, { stdio: "ignore" });
      fs.cpSync(path.join(process.cwd(), "juliette"), projectDir, { recursive: true });
      fs.rmSync(path.join(process.cwd(), "juliette"), { recursive: true, force: true });
    } else {
      execSync(`git clone https://github.com/binhnguyen00/juliette ${projectName}`, { stdio: "ignore" });
    }
    spinner.succeed("Preparing template...\n");

    if (!fs.existsSync(projectDir)) {
      spinner.fail("Failed to prepare template");
      rl.close();
      process.exit(0);
    } else {
      fs.rmSync(path.join(projectDir, ".vscode"), { recursive: true, force: true });
    }

    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
      fs.rmSync(path.join(projectDir, ".gitignore"), { force: true });
    }

    spinner.start("Installing dependencies...");
    execSync(`cd ${projectDir} && npm install`, { stdio: "ignore" });
    spinner.succeed("Installing dependencies...\n");

    spinner.start("Building project...");
    execSync(`cd ${projectDir} && npm run build`, { stdio: "ignore" });
    spinner.succeed("Building project...\n");

    if (isEmptyProjectName) {
      console.log(`Project created successfully! ✅\n`);
    } else {
      console.log(`Project "${projectName}" created successfully! ✅\n`);
    }
    console.log(`Location: ${projectDir} 📁\n`);
    runProjectOrNot(projectDir);
  }

  catch (ex) {
    console.error("Failed to setup project:", ex.message);
    rl.close();
    process.exit(0);
  }
});