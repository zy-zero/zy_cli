
const program = require('commander');
const { init } = require('./bin/init');

program.version('0.0.1', '-v, --version')
    .command('init <name>')
    .action((name) => {
        init();
    });
program.parse(process.argv);


