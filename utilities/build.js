import { exec, execSync } from 'child_process';

const syncCommands = [
    {
        name: 'removeDist',
        command: 'rm -rf ./dist',
        message: 'The ./dist folder has been deleted.'
    }
];
const asyncCommands = {
    group1: [
        {
            name: 'runTSC',
            command: 'tsc',
            message: 'The TypeScript compiler has run successfully.'
        },
        {
            name: 'runSASS',
            command: 'sass ./src/public/css:./dist/public/css',
            message: 'The SASS compiler has run successfully.'
        }
    ],
    group2: [
        {
            name: 'copyHTML',
            command: 'cp -r ./src/public/html/* ./dist/public',
            message: 'Successfully copied all HTML to the ./dist/public/html folder.'
        },
        {
            name: 'copyVendorCSS',
            command: 'cp ./node_modules/bulma/css/bulma.min.css ./dist/public/css',
            message: 'Successfully copied all vendor CSS to the ./dist/public/css folder.'
        }
    ]
};

function runAsync(group) {
    return Promise.all(
        group.map(command => {
            return new Promise(resolve => {
                exec(command.command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    console.log(command.message);
                    resolve('success');
                });
            })
        })
    );
}

syncCommands.forEach(config => {
    execSync(config.command);
    console.log(config.message);
});

for (const group in asyncCommands) {
    await runAsync(asyncCommands[group]);
    
}