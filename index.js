const inquirer =require('inquirer');
const fs = require('fs');
const { ifAnsweredThenAddText, addTableofContents, ifAnsweredBasicsThenAddText, getLicenseText, getLicenseBadge, addReconciledBadges } = require("./helpers/helpers.js");


const questions = [
        {
            type: "input",
            name: "title",
            message: "What is the project title?"
        },
        {
            type: "input",
            name: "description",
            message: "Write a brief description of your project: "
        },
        {
            type: "input",
            name: "installation",
            message: "Describe the installation process if any: "
        },
        {
            type: "input",
            name: "usage",
            message: "What is this project usage for?"
        },
        {
            type: "list",
            name: "license",
            message: "What is the icense for this project: ",
            choices: [
                "Apache",
                "Academic",
                "GNU",
                "ISC",
                "MIT",
                "Mozilla",
                "Open"
            ]
        },
        {
            type: "input",
            name: "contributors",
            message: "Who are the contributors of this projects?"
        },
        {
            type: "input",
            name: "tests",
            message: "Is there a test included?"
        },
        {
            type: "input",
            name: "questions",
            message: "What do I do if I have an issue? "
        },
        {
            type: "input",
            name: "Github username",
            message: "Please enter your GitHub username: "
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email: "
        }
    ];
    global.answers = {};

    const generateReadMe = answers => {

        // Make answers accessible at this level
        let {
            title,
            description,
            installation,
            usage,
            license,
            contribution,
            tests,
            questions,
            githubUsername,
            email
    
        } = answers;
        if (license === "-- Skip --") {
            license = null;
            answers.license = null;
        }
     let text = "";
    text += ifAnsweredThenAddText(title, title + "\n====\n");
    text += ifAnsweredThenAddText(description, "Description\n---\n" + description + "\n\n");
    text += ifAnsweredThenAddText(installation, "Installation\n---\n" + installation + "\n\n");
    text += ifAnsweredThenAddText(usage, "Usage\n---\n" + usage + "\n\n");
    text += ifAnsweredThenAddText(license, "License\n---\n" + getLicenseText(license) + "\n\n");
    text += addTableofContents();
    text += ifAnsweredThenAddText(contribution, "Contribution\n---\n" + contribution + "\n\n");
    text += ifAnsweredThenAddText(tests, "Tests\n---\n" + tests + "\n\n");
    text += ifAnsweredThenAddText(questions, "Questions\n---\n" + questions + "\n\n");
    text += ifAnsweredBasicsThenAddText(githubUsername, email);

    // If all questions skipped
    if (text.length === 0) {
        console.error("\n\nError: You skipped all questions, so there's no readme to generate.");
        process.exit(0);
    }

    // Generate ReadMe file
    const filename = "Generated-README.md";
    fs.writeFileSync(filename, text);

    // Show ReadMe text generated in Node JS output
    console.group("README Generator");
    console.log(`Generating:\n\n${text}\nFinished.\n\nThe above README generated and written to:\n` + path.join(__dirname, filename) + "\n\n");
    console.groupEnd();

};

const catchError = err => {
    console.log("Error: ", err);
}

// Use Inquirer API that takes your questions, a callback to handle the questions, and a callback to handle errors
inquirer
    .prompt(questions)
    .then(generateReadMe)
    .catch(catchError);