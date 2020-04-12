
const program = require('commander');
const { init } = require('./bin/init');

program.version('0.0.1', '-v, --version')
    .command('init <name>')
    .action((name) => {
        init(name);
    });
program.parse(process.argv);


