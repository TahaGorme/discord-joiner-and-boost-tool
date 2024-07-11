//Importing Modules
const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const Captcha = require('2captcha');
const { ProxyAgent } = require('proxy-agent');
const chalk = require('chalk');

// Config
const config = require('./config');
let invite = config.invite;
let captcha_key = config.two_captcha_key;
let captcha_retry_limit = config.captcha_retry_limit;
let join_delay_min = config.join_delay_min;
let join_delay_max = config.join_delay_max;


//Error Handling
process.on('unhandledRejection', (error) => {
    console.error(chalk.bold.red('Unhandled Rejection:'));
    console.error(chalk.red(error));
    console.error(chalk.bold.red('Error Stack:'));
    console.error(chalk.red(error.stack));

})
process.on('uncaughtException', (error) => {
    console.error(chalk.bold.red('Uncaught Exception:'));
    console.error(chalk.red(error));
    console.error(chalk.bold.red('Error Stack:'));
    console.error(chalk.red(error.stack));
})

//Initializing Variables
let proxies = fs.readFileSync('proxies.txt', 'utf8').replace(/\r/g, '').split('\n').filter(x => x);

let isUsingProxy = proxies.length > 0;
let joined = 0;
let failed = 0;
let i = 0;
let j = 0;
let tokens = fs.readFileSync('tokens.txt', 'utf8').replace(/\r/g, '').split('\n').filter(x => x);
const solver = new Captcha.Solver(captcha_key);



console.log(chalk.magenta(`Token Joiner and Booster by ${chalk.yellowBright(chalk.underline('@tahagorme'))}!`));
console.log(chalk.green(`Started the program with ${chalk.blueBright(chalk.underline(tokens.length))} tokens and ${chalk.blueBright(chalk.underline(isUsingProxy ? 'Proxy' : 'No Proxy'))}!`));

tokens.forEach(token => {
    setTimeout(async () => {
        j++;
        await join(token, j == tokens.length);
    }, randomInt(join_delay_min, join_delay_max) * (++i));
});

async function join(token, isLast) {
    let randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
    const proxy = isUsingProxy ? new ProxyAgent(randomProxy) : undefined;

    const client = new Client({
        captchaSolver: function (captcha, UA) {
            return solver
                .hcaptcha(captcha.captcha_sitekey, 'discord.com', {
                    invisible: 1,
                    userAgent: UA,
                    data: captcha.captcha_rqdata,
                })
        },
        captchaRetryLimit: captcha_retry_limit,
        ws: {
            agent: proxy,
        },
        http: {
            agent: proxy,
        },

    });
    client.on('ready', async () => {
        console.log(chalk.green(`Logged in as ${chalk.blue(chalk.underline(client.user.tag))}!`));
        await client.acceptInvite(invite).then(() => {

            console.log(chalk.green(`Joined ${chalk.blueBright(chalk.underline(invite))} from ${chalk.blueBright(chalk.underline(client.user.tag))}!`));


            joined++;
            if (isLast) {
                console.log(chalk.green(`Joined: ${chalk.blueBright(chalk.underline(joined))}\nFailed: ${chalk.redBright(chalk.underline(failed))}`));
            }





            if (config.boost.enabled) {
                setTimeout(async () => {
                    const allBoosts = await client.billing.fetchGuildBoosts()
                    allBoosts.each(async (boost) => {
                        await boost.unsubscribe().catch((err) => { })
                        setTimeout(async () => {
                            await boost.subscribe(config.boost.server_id)
                            console.log(chalk.green(`Boosted ${chalk.blueBright(chalk.underline(client.user.tag))} in ${chalk.blueBright(chalk.underline(config.boost.server_id))}!`));
                        }, 500)
                    })
                }, randomInt(config.boost.delay_min, config.boost.delay_max))
            }



        }).catch((error) => {
            console.log(chalk.red(`Failed to join ${chalk.blueBright(chalk.underline(invite))} as ${chalk.blueBright(chalk.underline(client.user.tag))}!`));
            failed++;
            console.log(chalk.red(`Error: ${error}`));
            if (isLast) {
                console.log(chalk.green(`Joined: ${chalk.blueBright(chalk.underline(joined))}\nFailed: ${chalk.redBright(chalk.underline(failed))}`));
            }
        });
    });

    client.login(token).catch((error) => {
        if (error.toString()?.includes("INVALID") && error.toString()?.includes("TOKEN")) {
            console.log(chalk.red(`Invalid Token: ${chalk.blueBright(chalk.underline(token))}`));
            //removing invalid token from tokens.txt
            fs.writeFileSync('tokens.txt', fs.readFileSync('tokens.txt', 'utf8').replace(token + '\n', ''));
            console.log(`Removed invalid token: ${chalk.blueBright(chalk.underline(token))} from tokens.txt!`);

        }
    });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
