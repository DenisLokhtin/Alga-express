const { I } = inject();

Given('я зашёл на страницу {string}', (page) => {
    I.amOnPage('/' + page);
});

Given('я ввожу данные:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
   if (table.rows.length === 4) {
       I.fillField({css: 'input.form-control'}, '550555555');
   }
});

When('нажимаю на чекбокс', () => {
    I.click({css: 'input.PrivateSwitchBase-input.css-1m9pwf3'})
});

When('нажимаю на кнопку {string}', (button) => {
    I.click(button);
    I.wait(1);
});

Then('я вижу текст {string}', (text) => {
    I.see(text);
});