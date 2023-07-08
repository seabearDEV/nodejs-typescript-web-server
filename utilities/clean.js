import { cwd } from 'process';
import { exec, execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';

const packageJSON = JSON.parse(await readFile(`${cwd()}/package.json.clean`));
const asyncCommands = {
    "group1": [
        {
            "description": "Delete the /dist folder",
            "run": "rm -rf ./dist",
            "message": "The /dist folder has been deleted."
        },
        {
            "description": "Delete the /node_modules folder",
            "run": "rm -rf ./node_modules",
            "message": "The /node_modules folder has been deleted."
        },
        {
            "description": "Delete the /src folder",
            "run": "rm -rf ./src",
            "message": "The /src folder has been deleted."
        },
    ]
};

function runAsync(group) {
    return Promise.all(
        group.map((command) => {
            return new Promise((resolve) => {
                exec(command.run, (error, stdout, stderr) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    console.log(command.message);
                    resolve('success');
                });
            });
        })
    );
}

for (const group in asyncCommands) {
    await runAsync(asyncCommands[group]);
}

await writeFile(`${cwd()}/package.json`, JSON.stringify(packageJSON));