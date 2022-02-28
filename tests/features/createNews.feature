#language: ru

Функционал: Я захожу на страницу News,
  вхожу как Admin. Ввожу данные во все поля.
  После этого новость должна быть создана.

  @createNews
  Сценарий: Создание новости
    Допустим я зашёл на страницу "user/login"
    Если я ввожу данные:
      | email    | admin@gmail.com |
      | password | 12345678        |
    И нажимаю на кнопку "войти"
    То я вижу текст "Вы авторизированы!"

    Допустим я зашёл на страницу "alga-express/news"
    Затем я введу данные:
      | title    | some title                                                                                                |
      | //iframe | <span id="_mce_caret" data-mce-bogus="1" data-mce-type="format-caret"><strong>﻿asdasdasda</strong></span> |

    И нажимаю на кнопку "Добавить"
    То я вижу текст "Свежая новость добавлена!"