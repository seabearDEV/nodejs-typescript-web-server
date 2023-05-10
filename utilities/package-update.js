import { cwd } from 'process';
import { exec } from 'child_process';
import { readFile } from 'fs/promises';

const packageJSON = JSON.parse(
    await readFile(`${cwd()}/package.json`)
);

let packages = [];

function extractDependencies(items) {
    for (const item in items) {
        packages.push({
            name: item,
            version: items[item]
        });
    }
}

if (packageJSON.devDependencies) {
    extractDependencies(packageJSON.devDependencies);
}
if (packageJSON.dependencies) {
    extractDependencies(packageJSON.dependencies);
}

console.log(packages);