#language: ru

Функционал: Я захожу на страницу login,
  Пройдя аутентификацию, перехожу на страницу "Заказать выкуп".
  Я как зарегистрированный пользователь
  Должен иметь возможность заказть выкуп.
  Когда я введу данные выкупа, выкуп должен быть заказан.

  @orderBuyouts
  Сценарий: Заказ выкупа
    Допустим я зашёл на страницу "user/login"
    Если я ввожу данные:
      | email    | user@gmail.com |
      | password | 12345678       |
    И нажимаю на кнопку "войти"
    То я вижу текст "Вы авторизированы!"

    Если я захожу на страницу "/user/orderBuyouts" кликаю на select
    И выбираю страну
    Затем я ввожу данные:
      | description | зеленая футболка                            |
      | url         | https://www.polo.co.za/men/apparel/t-shirts |
    Затем я кликаю на инпут
    И загружаю фотографию
    Затем я нажимаю на кнопку "Заказать"
    И я вижу текст "Новый заказ выкупа добавлен!"