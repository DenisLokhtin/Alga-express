class distributions {
    passwordReset(code) {
        return (
            `<div>
                <p>Здравствуйте!</p>
                <p>Мы получили запрос о смене пароля к вашему  аккаунту.</p> 
                <p>Код для сброса пароля: <b>${code}</b></p>
                <p>Для изменения пароля, пожалуйста,  <a href="http://localhost:3000/secret/reset-password">Перейдите по ссылке</a></p>
                <p>Если вы не отправляли запрос - просто проигнорируйте это письмо.</p>
                <p>С уважением Alga-express</p>
            </div>`
        )}

    balanceText(balance, currentBalance, user) {
        return (
            `<div>
                <p>Здравствуйте уважаемый ${user}!</p>
                <p>Ваш баланс пополнен на <b>${balance}</b> сом.</p>
                <p>Ваш текущий баланс составляет: <b>${currentBalance}</b> сом.</p>
                <p>Подробную выписку можно посмотреть в вашем личном кабинете.</p>
                <p>С уважением Alga-express</p>
            </div>`
        )}


    packagesText(cargoNumber, packagesTitle) {
        return (
            `<div>
                <p>Здравствуйте!</p>
                <p>Посылка прибыла на наш склад и готова к доставке:</p> 
                <p>${cargoNumber}  ${packagesTitle}</p>
                <p>Стоимость доставки и ваш баланс вы можете проверить в вашем личном кабинете</p>
                <p>С уважением Alga-express</p>
            </div>`
        )}
}

const mailDistributions = new distributions();

module.exports = mailDistributions;


