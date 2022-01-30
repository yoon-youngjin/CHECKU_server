import { Builder, By, Key, until } from 'selenium-webdriver';
import dotenv from 'dotenv';
dotenv.config();
export const initController = (req, res) => {
    (async function test() {
        try {
            await console.log('init');
            let driver = await new Builder('./chromedriver').forBrowser('chrome').build();
            await driver.get('https://sugang.konkuk.ac.kr/');
            await driver.switchTo().frame(driver.findElement(By.id('Main')));
            await driver.findElement(By.id('stdNo')).sendKeys('dudwls143');
            await driver.findElement(By.id('pwd')).sendKeys('@dudwlsdl12');
            await driver.findElement(By.className('btn-login')).click();

            await driver.wait(until.ableToSwitchToFrame(By.id('coreMain')), 10000);

            await driver.findElement(By.id('menu_search')).click();

            const click = await driver.wait(until.elementLocated(By.xpath('//*[@id="sForm"]/table/tbody/tr[1]/td[2]/label[2]')));
            click.click();

            await driver.findElement(By.id('pSustMjCd')).sendKeys('컴퓨터공학과');

            await driver.findElement(By.id('btnSearch')).click();
            await driver.sleep(1000);

            let obj = {};
            let json = {};
            let item1 = new Object();
            let item2 = new Object();

            for (let i = 0; i < 2; i++) {
                await driver.findElement(By.xpath('/html/body/div[2]/main/div/div/div/div[1]/div[2]/div/div[3]/div[3]/div/table/tbody/tr[' + (i + 2) + ']/td[19]/button')).click();
                // await driver.sleep(50);

                let temp = await driver.findElement(By.xpath('/html/body/div[2]/main/div/div/div/div[1]/div[2]/div/div[3]/div[3]/div/table/tbody/tr[' + (i + 2) + ']/td[18]'));
                let temp2 = await driver.findElement(By.xpath('/html/body/div[2]/main/div/div/div/div[1]/div[2]/div/div[3]/div[3]/div/table/tbody/tr[' + (i + 2) + ']/td[17]'));
                // console.log(await temp.getText());
                // console.log(await temp2.getText());
                // json[i] = (await temp.getText()) + ' ' + (await temp2.getText());
                json[i] = await temp.getText();

                // if (i == 0) {
                //     item1[i] = await temp.getText();
                //     await console.log(item1);
                //     await json.push(item1);
                //     await console.log(json);
                // }
                // if (i == 1) {
                //     item2[i] = await temp.getText();
                //     await console.log(item2);
                //     await json.push(item2);
                // }

                // console.log(json[i]);

                // obj['/html/body/div[2]/main/div/div/div/div[1]/div[2]/div/div[3]/div[3]/div/table/tbody/tr[' + (i + 2) + ']/td[19]/button'] =
                //     '/html/body/div[2]/main/div/div/div/div[1]/div[2]/div/div[3]/div[3]/div/table/tbody/tr[' + (i + 2) + ']/td[18]';

                // console.log(obj[str]);
            }
            await console.log(json);
            // await console.log(JSON.stringify(json));
            await res.status(200).send(JSON.stringify(json));

            // for await (let i = 0; i < 57; i++) {
            //     await driver.findElement(By.xpath(obj[str])).click();
            //     let temp = await driver.findElement(By.xpath(str)).click();
            //     await driver.sleep(1000);

            //     data = await (await temp.getText()).split('/');
            //     await driver.sleep(1500);
            //     await console.log(data[0]);
            // }
        } finally {
            driver.quit();
        }
    })();
};
