import { cwd } from 'process';
import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';

// Get the template type from the command line or use 'base' as a default
const templateType = process.argv.slice(2)[0] ? process.argv.slice(2)[0] : 'base';

// Get the current package.json file
const packageJSON = JSON.parse(await readFile(`${cwd()}/package.json`));

// Get the base and application templates
const baseTemplate = JSON.parse(await readFile(`${cwd()}/templates/base/base.json`));
const applicationTemplate = JSON.parse(await readFile(`${cwd()}/templates/${templateType}/${templateType}.json`));

// Set the combined template constants
const dependencies = {
    baseTemplate: baseTemplate['package-json'].dependencies,
    applicationTemplate: applicationTemplate['package-json'].dependencies
};
const devDependencies = {
    baseTemplate: baseTemplate['package-json'].devDependencies,
    applicationTemplate: applicationTemplate['package-json'].devDependencies
};
const scripts = {
    baseTemplate: baseTemplate['package-json'].scripts,
    applicationTemplate: applicationTemplate['package-json'].scripts
};

// Set the template-type property in the package.json object
packageJSON['template-type'] = templateType;

// Install dependencies from templates
function installDependencies(dependencies, templateItem, type) {
    if (dependencies[templateItem]) {
        dependencies[templateItem].forEach(dependency => {
            execSync(`npm install ${dependency} ${type}`);
        });
    };
}

// Set scripts from templates into package.json
function setScripts(templateItem) {
    for (const script in scripts[templateItem]) {
        packageJSON.scripts[script] = scripts[templateItem][script];
    }
}

// Loop over all the scripts from templates and run the setScripts function
for (const templateItem in scripts) { 
    setScripts(templateItem);
}

// Write the new package.json file
await writeFile(`${cwd()}/package.json`, JSON.stringify(packageJSON));

for (const templateItem in dependencies) {
    installDependencies(dependencies, templateItem, '--save');
}
for (const templateItem in devDependencies) {
    installDependencies(devDependencies, templateItem, '--save-dev');
}

// Run the synchronous commands defined in the application template
applicationTemplate['genesis-js'].syncCommands.forEach(command => {
    execSync(command.run);
    console.log(command.message);
});