import { cwd } from 'process';
import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';

const base = JSON.parse(await readFile(`${cwd()}/templates/base/base.json`));
const packageJSON = JSON.parse(await readFile(`${cwd()}/package.json`));
const templateType = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : 'base';
const template = JSON.parse(await readFile(`${cwd()}/templates/${templateType}/${templateType}.json`));
const dependencies = template['package-json'].dependencies;
const devDependencies = template['package-json'].devDependencies;
const scripts = template['package-json'].scripts;

packageJSON['template-type'] = templateType;
packageJSON.scripts = {};
packageJSON.dependencies = {};
packageJSON.devDependencies = {};

for (const script in base['package-json']['scripts']) {
    packageJSON.scripts[script] = base['package-json']['scripts'][script];
}

for (const script in scripts) {
    packageJSON.scripts[script] = scripts[script];
}

await writeFile(`${cwd()}/package.json`, JSON.stringify(packageJSON));

if (devDependencies) {
    devDependencies.forEach(dependency => {
        execSync(`npm install --save-dev ${dependency}`);
    });
}

if (dependencies) {
    dependencies.forEach(dependency => {
        execSync(`npm install --save ${dependency}`);
    });
}

template['genesis-js'].syncCommands.forEach(command => {
    execSync(command.run);
    console.log(command.message);
});