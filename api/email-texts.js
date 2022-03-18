class distributions {
    passwordReset(code, user) {
        return (
            `<div>
                <p>Здравствуйте уважаемый(ая) ${user}!</p>
                <p>Мы получили запрос о смене пароля к вашему  аккаунту.</p> 
                <p>Код для сброса пароля: <b>${code}</b></p>
                <p>Для изменения пароля, пожалуйста,  <a href="http://localhost:3000/secret/reset-password">Перейдите по ссылке</a></p>
                <p>Код для сброса действителен только в течении 5 минут</p>
                <p>Если вы не отправляли запрос - просто проигнорируйте это письмо.</p>
                <p>С уважением Alga-express</p>
            </div>`
        )}

    balanceText(balance, currentBalance, user) {
        return (
            `<div>
                <p>Здравствуйте уважаемый(ая) ${user}!</p>
                <p>Ваш баланс пополнен на <b>${balance}</b> сом.</p>
                <p>Ваш текущий баланс составляет: <b>${currentBalance}</b> сом.</p>
                <p>Подробную выписку можно посмотреть в вашем личном кабинете.</p>
                <p>С уважением Alga-express</p>
            </div>`
        )}

    balanceTextTelegram(balance, currentBalance, user) {
        return `Здравствуйте уважаемый ${user}!
                Ваш баланс пополнен на <b>${balance}</b> сом.
                Ваш текущий баланс составляет: <i><b>${currentBalance}</b></i> сом.
                Подробную выписку можно посмотреть в вашем личном кабинете.
                С уважением Alga-express`
        }

    packagesText(cargoNumber, packagesStatus, user) {
        return (
            `<div>
                <p>Здравствуйте уважаемый(ая) ${user}!</p>
                <p>Статус вашей посылки ${cargoNumber} изменен на ${packagesStatus}</p> 
                <p>Стоимость доставки и ваш баланс вы можете проверить в вашем личном кабинете</p>
                <p>С уважением Alga-express</p>
            </div>`
        )}

    buyoutText(text, buyoutStatus, user) {
        return (
            `<div>
                <p>Здравствуйте уважаемый(ая) ${user}!</p>
                <p>Статус вашего выкупа <i>${text}</i> изменен на ${buyoutStatus}</p> 
                <p>Стоимость доставки и ваш баланс вы можете проверить в вашем личном кабинете</p>
                <p>С уважением Alga-express</p>
            </div>`
        )}

    buyoutTextTelegram(text, buyoutStatus, user) {
        return (
            `
                Здравствуйте уважаемый(ая) ${user}!
                Статус вашего выкупа <i>${text}</i> изменен на <b>${buyoutStatus}</b>
                Стоимость доставки и ваш баланс вы можете проверить в вашем личном кабинете
                С уважением Alga-express
            `
        )}

    newsText(text, user) {
        return (
            `<div>
                <p>Здравствуйте уважаемый(ая) ${user}!</p>
                <p>${text}</p>
                <p>С уважением Alga-express</p>
            </div>`
        )}

    newsTextTelegram(text, user) {
        return (
            `
                Здравствуйте уважаемый(ая) ${user}!
               ${text}
                С уважением Alga-express
            `
        )}
}

const mailDistributions = new distributions();

module.exports = mailDistributions;


