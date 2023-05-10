import { cwd } from 'process';
import { exec } from 'child_process';
import { readFile } from 'fs/promises';

const packageJSON = JSON.parse(
    await readFile(`${cwd()}/package.json`)
);

let dependencies = [];

function extractDependencies(packages) {
    for (const item in packages) {
        dependencies.push({
            name: item,
            version: packages[item]
        });
    }
}

if (packageJSON.devDependencies) {
    extractDependencies(packageJSON.devDependencies);
}
if (packageJSON.dependencies) {
    extractDependencies(packageJSON.dependencies);
}

dependencies.forEach(dependency => {
    exec(`npm install ${dependency.name}@latest`, (err, stdout) => {
        if (err) {
            console.error(`Error: ${err}`);
            return;
        }
        console.log(stdout);
    });
});