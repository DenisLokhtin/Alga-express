const { I } = inject();

Given('я зашёл на страницу {string}', (page) => {
    I.amOnPage('/' + page);
    I.wait(3);
});

Given('я ввожу данные:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
});


When('нажимаю на кнопку {string}', (button) => {
    I.click(button);
    I.wait(3);
});

Then('я вижу текст {string}', (text) => {
    I.see(text);
});