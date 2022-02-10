const {I} = inject();

Given('я захожу на страницу {string} кликаю на select', (page) => {
    I.amOnPage(page);
    I.click("//form//div[@id='demo-controlled-open-select']");
});

When('выбираю страну', async () => {
    I.click(`//ul//li[@data-value="Turkey"]`);
});

Then('я ввожу данные:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
});