import { Command } from 'commander';
import forever from 'forever';

const program = new Command();

program
    .name('github-analytics-cli')
    .description('CLI to collect GitHub data and send analytics')
    .version('1.0.0');

program
    .command('run-forever <username>')
    .description('Run the GitHub data collection script forever for the specified username')
    .action((username) => {
        forever.startDaemon('./cli/script.js', {
            args: ['run-forever', username],
            silent: true,
            watch: false,
        });
        console.log(`Running GitHub data collection script with forever for ${username}...`);
    });

program.parse(process.argv);
