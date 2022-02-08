const {I} = inject();

Then('я введу данные:', (table) => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
    I.attachFile('//div//input[@type="file"]', './files/news.jpeg');
    I.wait(4)
});