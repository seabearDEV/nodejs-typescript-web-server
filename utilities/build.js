import { exec, execSync } from 'child_process';

const buildConfig = {
    sync: [
        {
            name: 'removeDist',
            command: 'rm -rf ./dist',
            message: 'The ./dist folder has been deleted.'
        },
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
    async: [   
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

buildConfig.sync.forEach(config => {
    execSync(config.command);

    console.log(config.message);
});
buildConfig.async.forEach(config => {
    exec(config.command, (err) => {
        if (err) {
            console.error(`Error: ${err}`);
            return;
        }
        
        console.log(config.message);
    });
});