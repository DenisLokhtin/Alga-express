const {I} = inject();

Given('я зашёл на страницу {string} кликаю на select', (page) => {
    I.amOnPage('/' + page);
    I.click("//form//div[@id]");
});

When('выбираю страну',() => {
    I.click(`//ul//li[@data-value="China"]`);
});

Then('я ввожу данные:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
});