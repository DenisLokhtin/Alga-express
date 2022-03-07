# language: ru

Функционал: Регистрация пользователя
  Как анонимный пользователь
  я могу зарегестрироваться в системе
  после того как я введу все данные во все поля

  @register
  Сценарий: Регистрация
    Допустим я зашёл на страницу "user/register"
    Если я ввожу данные:
      | name                            | user user user      |
      | //form//div//input[@type='tel'] | 550555555           |
      | email                           | test_user@gmail.com |
      | password                        | 12345678            |
      | confirmPassword                 | 12345678            |
    И нажимаю на чекбокс
    И нажимаю на кнопку "зарегистрироваться"
    Затем я вижу текст "Вы зарегистрированы"

  @login
  Сценарий: Логин
    Допустим я зашёл на страницу "user/login"
    Если я ввожу данные:
      | email    | user@gmail.com |
      | password | 12345678       |
    И нажимаю на кнопку "войти"
    То я вижу текст "Вы авторизированы!"
