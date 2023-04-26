import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";


const saveImageFile = async (filePath, arrayBuffer) => {
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
};

const createFolder = async (folderName) => {
    const folderPath = path.join(process.cwd(), folderName);
    try {
        await fs.access(folderPath);
    } catch {
        fs.mkdir(folderPath);
    }
};


const saveCountryInfo = async (folderName, countryInfoObject) => {
    let infoString = `
    Name: ${countryInfoObject.name.common}
    Official name: ${countryInfoObject.name.official}
    Capital city: ${countryInfoObject.capital[0]}
    Region: ${countryInfoObject.region}
    Subregion: ${countryInfoObject.subregion}
    Demonym: ${countryInfoObject.demonyms.eng.m}
    Area: ${countryInfoObject.area}`;
    await createFolder(folderName);
    const filePath = path.join(process.cwd(), folderName, "information.txt");
    await fs.writeFile(filePath, infoString);
};


const saveCountryFlag = async (folderName, countryFlagObject) => {
    const url = countryFlagObject.flags.png;
    const response = await fetch (url);
    const arrayBuffer = await response.arrayBuffer();

    await createFolder(folderName);
    const filePath = path.join(process.cwd(), folderName, "flag.png");
    await saveImageFile(filePath, arrayBuffer);
};


const saveCountryCoatofArms = async (folderName, countryCoatofArmsObject) => {
    const url = countryCoatofArmsObject.coatOfArms.png;
    const response = await fetch (url);
    const arrayBuffer = await response.arrayBuffer();

    await createFolder(folderName);
    const filePath = path.join(process.cwd(), folderName, "CoA.png");
    await saveImageFile(filePath, arrayBuffer);

};  

const parseOptions = async (countryObject, optionsObject) => {
    const options = optionsObject.options;
    const countryName = countryObject.name.common;

    if (options.includes(" Information")) {
        await saveCountryInfo(countryName, countryObject)
    }

    if (options.includes(" Flag")) {
        await saveCountryFlag(countryName, countryObject)
    }

    if (options.includes(" Coat of Arms")) {
        await saveCountryCoatofArms(countryName, countryObject)
    }
};

export {parseOptions};