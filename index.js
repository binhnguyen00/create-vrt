const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execSync } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});

const runProjectOrNot = (pathToProject) => {
  rl.question("Do you want to run the project? (y/n) ", (answer) => {
    rl.close();
    if (answer.toLowerCase() === "y") {
      execSync(`cd ${pathToProject} && npm run dev`, { stdio: "inherit" });
    }
    else {
      console.log("Skipped running");
      console.log("Your project is ready! 🌱");
    }
    process.exit(0);
  });
};

rl.question("What is your project name? ", (projectName) => {
  const projectDir = path.join(process.cwd(), projectName);
  const gitDir = path.join(projectDir, ".git");
  if (fs.existsSync(projectDir)) {
    console.error(`Directory "${projectName}" already exists.`);
    runProjectOrNot(projectDir);
    return;
  }

  try {

    console.log("Prepairing template... ⏳");
    execSync(`git clone https://github.com/binhnguyen00/juliette ${projectName}`, {
      stdio: "ignore"
    });

    if (!fs.existsSync(projectDir)) {
      console.error(`Failed to prepare template.`);
      rl.close();
      process.exit(0);
    } else {
      fs.rmSync(path.join(projectDir, ".vscode"), { recursive: true, force: true });
    }

    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
      fs.rmSync(path.join(projectDir, ".gitignore"), { force: true });
    }

    console.log("Installing dependencies... ⏳");
    execSync(`cd ${projectDir} && npm install`, {
      stdio: "ignore"
    });

    console.log("Building project... ⏳");
    execSync(`cd ${projectDir} && npm run build`, {
      stdio: "ignore"
    });

    console.log(`Project "${projectName}" created successfully! ✅`);
    console.log(`Location: ${projectDir} 📁`);
    runProjectOrNot(projectDir);
  }

  catch (ex) {
    console.error("Failed to setup project:", ex.message);
    rl.close();
    process.exit(0);
  }
});
