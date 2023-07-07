import { cwd } from 'process';
import { exec, execSync } from 'child_process';
import { readFile } from 'fs/promises';

const packageJSON = JSON.parse(await readFile(`${cwd()}/package.json`));
const templateType = packageJSON['template-type'];
const template = JSON.parse(await readFile(`${cwd()}/templates/${templateType}/${templateType}.json`));
const asyncCommands = template['build-js'].asyncCommands;
const syncCommands = template['build-js'].syncCommands;

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

syncCommands.forEach((config) => {
	execSync(config.run);
	console.log(config.message);
});

for (const group in asyncCommands) {
	await runAsync(asyncCommands[group]);
}