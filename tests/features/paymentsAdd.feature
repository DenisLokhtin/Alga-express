#language: ru

Функционал: Я захожу на страницу login,
  Прохожу аутентификацию, перехожу на страницу пополнение баланса.
  Как зарегистрированный пользователь
  Я должен иметь возможность пополнить баланс.
  Когда я внесу оплату, баланс должен быть пополнен.

  @user/payments/add
  Сценарий: Пополнение баланса
    Допустим я зашёл на страницу "user/login"
    Если я ввожу данные:
      | email    | user@gmail.com |
      | password | 12345678        |
    И нажимаю на кнопку "войти"
    То я вижу текст "Вы авторизированы!"

    Допустим я зашел на страницу "user/payments/add"
    Затем я ввожу данные о товаре:
      | //form//input[@name="description"] | Snickers Nike Air |

    Затем я кликаю на инпут
    И загружаю фотографию

    Затем я нажимаю на кнопку "Отправить"
    То я вижу текст "Оплата отправлена"