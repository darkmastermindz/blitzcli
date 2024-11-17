#!/usr/bin/env node

const { Command } = require("commander");
const shell = require("shelljs");
const chalk = require("chalk");

const program = new Command();

// Utility functions
const logSuccess = (message) => console.log(chalk.green(`✅ ${message}`));
const logError = (message) => console.log(chalk.red(`❌ ${message}`));
const logInfo = (message) => console.log(chalk.blue(`ℹ️ ${message}`));

// CLI Commands
program
    .name("blitzcli")
    .description("⚡ BlitzCLI: A fast way to set up environments and automate tasks.")
    .version("1.0.0");

program
    .command("clone-dotfiles")
    .description("🗂️ Clone the .dotfiles project from a repository.")
    .action(async () => {
        logInfo("Preparing to clone your .dotfiles repository...");
        try {
            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "repo",
                    message: "Enter the Git repository URL for your .dotfiles:",
                    default: "https://github.com/yourusername/dotfiles.git", // Provide a default URL
                    validate: (input) => (input.startsWith("https").endsWith("dotfiles.git") ? true : "Please enter a valid URL."),
                },
                {
                    type: "input",
                    name: "destination",
                    message: "Enter the destination folder (default: ~/.dotfiles):",
                    default: `${process.env.HOME}/.dotfiles`,
                },
            ]);

            const { repo, destination } = answers;
            logInfo(`Cloning repository ${repo} into ${destination}...`);

            if (shell.exec(`git clone ${repo} ${destination}`).code === 0) {
                logSuccess(".dotfiles cloned successfully! 🚀");
            } else {
                logError("Failed to clone .dotfiles. 😞");
            }
        } catch (err) {
            logError("An error occurred during cloning. ❌");
            console.error(err);
        }
    });

program
    .command("install-terraform")
    .description("🛠️ Install Terraform.")
    .action(() => {
        logInfo("Installing Terraform...");
        if (shell.exec("brew install terraform").code === 0) {
            logSuccess("Terraform installed successfully! 🎉");
        } else {
            logError("Failed to install Terraform. 😢");
        }
    });

program
    .command("install-awscli")
    .description("☁️ Install AWS CLI.")
    .action(() => {
        logInfo("Installing AWS CLI...");
        if (shell.exec("brew install awscli").code === 0) {
            logSuccess("AWS CLI installed successfully! 🌟");
        } else {
            logError("Failed to install AWS CLI. 😩");
        }
    });

program
    .command("install-netlify-cli")
    .description("🌐 Install Netlify CLI.")
    .action(() => {
        logInfo("Installing Netlify CLI...");
        if (shell.exec("npm install -g netlify-cli").code === 0) {
            logSuccess("Netlify CLI installed successfully! ✨");
        } else {
            logError("Failed to install Netlify CLI. 😔");
        }
    });

program
    .command("install-docker")
    .description("🐳 Install Docker.")
    .action(() => {
        logInfo("Installing Docker...");
        if (shell.exec("brew install --cask docker").code === 0) {
            logSuccess("Docker installed successfully! 🐋");
        } else {
            logError("Failed to install Docker. 😢");
        }
    });

// Default behavior for unknown commands
program.on("command:*", () => {
    logError("Invalid command. Use --help to see the available commands. 🚨");
    process.exit(1);
});

// Parse arguments
program.parse(process.argv);
