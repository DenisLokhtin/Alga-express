const {I} = inject();

Given('я захожу на страницу {string} кликаю на select', (page) => {
    I.amOnPage(page);
    I.click("//form//div[@id='demo-controlled-open-select']");
});

When('выбираю страну из списка packageRegister', async () => {
    I.click(`//*[@id="menu-country"]/div[3]/ul/li[2]`);
});

Then('я ввожу данные:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
});

Then('Нажимаю на select выбора валют', async () => {
    I.click("(//*[@id=\"demo-controlled-open-select\"])[2]");
});

Then('выбираю валюту из списка валют', async () => {
    I.click(`//*[@id="menu-priceCurrency"]/div[3]/ul/li[1]`);
    I.wait(3);
});