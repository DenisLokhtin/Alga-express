const {I} = inject();

Given('я зашёл на страницу {string}',(page) => {
    I.amOnPage('/' + page);
});

When('я удалю поля:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.clearField(name, value);
    });
})

Then('я ввожу данные:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
});

Given('я зашел на страницу {string}',(page) => {
    I.amOnPage('/' + page);
});

Then('я кликаю на select и выбираю флаг и код страны',() => {
    I.click(`//div[@class=" flag-dropdown"]`);
});

Then( 'выбираю страну', () => {
    I.click('//div//li[@data-flag-key="flag_no_81"]')
});

Then('я ввожу номер телефона', () => {
    I.fillField('//form//input[@type="tel"]', '+996550440330');
});

Then('я кликаю на select',() => {
    I.click(`//div[@id="demo-simple-select-helper"]`);
});

Then('затем я выбираю телефон', () => {
    I.click('//div//li[@data-value="PHONE"]')
});

Then('я кликаю на инпут', () => {
    I.click('//form//input[@id="mui-3"]');
})

When('я загружаю фотографию', () => {
    I.attachFile('//div//input[@type="file"]', './files/avatar.jpeg');
})

Then('я нажимаю на кнопку {string}',(btnText) => {
    I.click(btnText)
});





// Then(`я нажимаю на кнопку {string}`, () => {
//     I.click('//form//button[.//span[contains(text(), \'Сохранить\')]]')
// });



// Then(`я нажимаю на кнопку {string}`, (buttonText) => {
//     if (buttonText === 'Сохранить') {
//         I.click('//form//button[.//span[contains(text(), \'Сохранить\')]]')
//     } else {
//         I.click(buttonText)
//     }
// });