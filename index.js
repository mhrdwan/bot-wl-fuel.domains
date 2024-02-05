import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import readlineSync from "readline-sync";
import { cekValidasi } from './gh.js';
import chalk from 'chalk';

puppeteer.use(StealthPlugin());

const dataEmail = fs.readFileSync('./email.txt', 'utf-8').split('\n');

const Main = async (emails, nomor) => {
    let angka = nomor + 1
    try {
        const browser = await puppeteer.launch({
            headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'],
        })
        const pageEmails = await browser.pages();
        const page = pageEmails[0];
        await page.goto('https://www.fuel.domains/')

        const email = '[id="email"]'
        await page.waitForSelector(email)
        if (email) {
            await page.type(email, emails)
        } else {
            console.log('error')
        }
        const submit = '[type="submit"]'
        await page.waitForSelector(submit)
        if (submit) {
            await page.click(submit)
        }
        console.log(chalk.greenBright("[", angka, "]", 'success add white list' + " " + emails))
        await browser.close()
    } catch (error) {

    }
}

(async () => {
    console.log(chalk.yellow('====================================='))
    console.log(chalk.greenBright('Create By Ridwan - HCA'))
    console.log(chalk.greenBright('Github : https://github.com/mhrdwan'))
    console.log(chalk.yellow('====================================='))

    for (const [index, email] of dataEmail.entries()) {
        await Main(email, index);
    }
})();