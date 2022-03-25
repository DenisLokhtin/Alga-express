const {I} = inject();

Given('я зашёл на страницу {string}', (page) => {
    I.amOnPage('/' + page);
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
});

Then('я вижу текст {string}', (text) => {
    I.see(text);
});

Given('я зашел на страницу', (page) => {
    I.amOnPage(page);
});

Then('я ввожу данные о товаре:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;
        I.fillField(name, value);
    });
});

Then('я кликаю на инпут', () => {
    I.click('//*[@id="mui-2"]');
})

When('загружаю фотографию', () => {
    I.attachFile('//div//input[@type="file"]', './files/texas.jpeg');
})

Then(`я нажимаю на кнопку {string}`, (btnText) => {
    I.click(btnText)
})

Then('То я вижу текст {string}', (text) => {
    I.see(text);
})











// Then('я ввожу данные:', (table) => {
//     table.rows.forEach(row => {
//         const name = row.cells[0].value;
//         const value = row.cells[1].value;
//         I.fillField(name, value);
//     });
// });

// Then('я кликаю на инпут', () => {
//     I.click('//*[@id="mui-113"]]');
// })
//
// When('загружаю фотографию', () => {
//     I.attachFile('//div//input[@type="file"]', './files/texas.jpeg');
// })
//
// Then(`я нажимаю на кнопку {string}`, (btnText) => {
//     I.click(btnText)
// })
//
// Then('То я вижу текст {string}', (text) => {
//     I.see(text);
// })