This application built with JavaScript will prompt us for a country to search the restcountries.com for, 
and then ask us if we want to download the info, flag, or the coat of arms for the country which will then be saved to our computer locally.

- Node.js v18.13.0 is used as JavaScript runtime environment.

- A CLI (Command Line App) was created to download Country info.

- The Country API (restcountries.com) was used to fetch info and pictures.

-  The user can choose to download any combination of:
	a. Information (as a text file)
	b. Flag (Picture of a flag for that Country)
	c. Coat of arms (The official coat of arms for that Country)

- After download, new folder is created with the Country's name.

- Information are saved in information.txt (saving basic information about the selected country).

- The Country's flag is saved as flag.png.

 - The Country's coat of arms is saved as CoA.png.

- The user is asked if they want to search for another Country.


Modules/Libraries used for this application are:
	- fetch from "node-fetch"
	- inquirer from "inquirer"
	- fs from "fs/promises"
	- path from "path"