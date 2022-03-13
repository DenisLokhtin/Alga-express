#language: ru

Функционал: Как админ я захожу на страницу Sites.
  Ввожу данные во все поля.
  После этого ссылка на сайт должна быть создана.

  @sites
  Сценарий: Создание ссылки на сайт
    Допустим я зашёл на страницу "user/login"
    Если я ввожу данные:
      | email    | admin@gmail.com |
      | password | 12345678        |
    И нажимаю на кнопку "войти"
    То я вижу текст "Вы авторизированы!"

    Затем я зашёл на страницу "alga-express/sites"
    Если я ввожу данные:
      | //form//input[@name="title"] | Nike                                                             |
      | //form//input[@name="url"] | https://www.nike.com/ru/w/mens-air-force-1-shoes-5sj3yznik1zy7ok |
    Затем я кликаю на инпут
    И загружаю фотографию
    Затем я нажимаю на кнопку "Добавить"
    То я вижу текст "Новая ссылка добавлена!"