import fetch from "node-fetch";
import inquirer from "inquirer";
import { parseOptions } from "./save.js";

const promptForCountry = async () => {
    return await inquirer.prompt({
        type : "input",
        name : "country_name",
        message : "Name of the Country :"
    });
};

//checkbox
const promptForDownloadInfo = async () => {
    return await inquirer.prompt({
        type : "checkbox",
        name : "options",
        message : "Country info to download: ",
        choices : [
            new inquirer.Separator(" "),
            {
                name : " Information",
            },
            {
                name : " Flag",
            },
            {
                name : " Coat of Arms",
            },
        ],
    });
};

//continue
const promptToContinue = async () => {
    return await inquirer.prompt({
        type : "list",
        message : "Would you like to search for another country?",
        name : "continue",
        choices : ["Yes", "No"],
    });
};

const fetchCountry = async (countryName) => {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    const response = await fetch(url);
    const json = await response.json();
    return json[0];
};

const promptUser = async () => {
    while (true) {
        const countryName = await promptForCountry();
        const countryJSON = await fetchCountry(countryName.country_name);
        const countryOptions = await promptForDownloadInfo();
        await parseOptions(countryJSON, countryOptions);
        const keepGoing = await promptToContinue();
        if (keepGoing.continue === "No") break;
    }
};

export {promptUser};
