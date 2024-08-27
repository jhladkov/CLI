import { exec } from 'child_process';

const username = 'jhladkov';

const runScript = (username) => {
    const command = `node ./cli/index.js run-forever ${username}`;
    console.log(`Executing command: ${command}`);

    exec(command, (error, stdout) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
    });
};

runScript(username)