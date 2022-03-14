const { I } = inject();

Given('я зашёл на страницу {string}', (page) => {
    I.amOnPage('/' + page);
    I.wait(3)
});

Given('я ввожу данные:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
});

When('нажимаю на кнопку удалить изображение в карусели {string}', () => {
    I.wait(3);
    I.click(`(//div//h3[contains(text(),'Новость для проверки добавления карусели')]/following-sibling::button[text()='Удалить изображение'])[2]`);
});

Given('я ввожу данные:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
});

Then('я кликаю на инпут для карусели', () => {
    I.click('//*[@id="root"]/div[4]/div/section/form/div[2]/div/div[2]/button');
})

Then('загружаю картинку для карусели', () => {
    I.attachFile('form input[name=picture]', './files/carousel.jpg');
})

Then('загружаю картинку для редактирования карусели', () => {
    I.attachFile('form input[name=picture]', './files/carousel-edit.jpg');
})

Then(`я нажимаю на ссылку редактирования изображения {string}`, () => {
    I.wait(3)
    I.click(`(//div//h3[text()='Новость для проверки добавления карусели']/following-sibling::div//a[text()='Редактировать изображение'])[2]`);
})
