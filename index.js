const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
program.version('0.0.1', '-v, --version')
    .command('init <name>')
    .action((name) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'author',
                message: '请输入作者名称'
            },
            {
                name: 'description',
                message: '请输入项目描述'
            }
        ]).then((answers) => {
            const spinner = ora('正在下载模板...');
            spinner.start();
            download(
                'https://github.com:zy-zero/zy_blog_api#master', 
                name, 
                {clone: true},
                (err) => {
                    if(!err){
                        spinner.succeed();
                        const meta = {
                            name,
                            description: answers.description,
                            author: answers.author,
                        }
                        const fileName = `${name}/package.json`;
                        if(fs.existsSync(fileName)){
                            const content = fs.readFileSync(fileName).toString();
                            const result = handlebars.compile(content)(meta);
                            fs.writeFileSync(fileName, result);
                        }
                        console.log(symbols.success, chalk.green('项目创建成功'));
                    }
                    else{
                        spinner.fail();
                        console.log(symbols.error, chalk.red(err));   
                    }
                    
                }
            );

        })
        
        console.log(name);
    });
program.parse(process.argv);


