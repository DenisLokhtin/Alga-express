const mongoose = require("mongoose");
const config = require("./config");
const {nanoid} = require("nanoid");
const User = require("./models/User");
const Payment = require("./models/Payment");
const Package = require("./models/Package");
const Flight = require("./models/Flight");
const News = require("./models/News");
const Market = require("./models/Market");
const TariffGroup = require("./models/TariffGroup");
const Pages = require("./models/Pages");

const run = async () => {
    await mongoose.connect(config.db.url, config.db.options);
    console.log('fixtures');

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const tariff = await TariffGroup.create({
        new: {
            usa: 12,
            turkey: 4.3,
            china: 15,
            chinaGround: 5,
        }
    });

    const [user, admin] = await User.create(
        {
            email: "user@gmail.com",
            password: "123",
            token: nanoid(),
            role: "user",
            balance: 200,
            name: "User",
            tariff: tariff.new,
            avatar: 'avatar1.jpeg',
            phone: {number: '786 67 78 99', type: 'PHONE'},
            passport: {image: 'passport.jpg'}
        },
        {
            email: "admin@gmail.com",
            password: "123",
            token: nanoid(),
            role: "admin",
            balance: 0,
            name: "Admin",
            avatar: 'avatar2.jpeg',
            phone: {number: '754 76 45 54', type: 'PHONE'},
            passport: {image: 'passport.jpg'}
        }
    );

    await Payment.create(
        {
            description: 'Payment Description 1',
            user: user,
            status: false,
            image: 'payment.png',
        },
        {
            description: 'Payment Description 2',
            user: user,
            status: false,
            image: 'payment.png',
        },
    );

    const [flight1, flight2] = await Flight.create(
        {
            number: nanoid(),
            depart_date: '2022-05-15',
            arrived_date: '2022-05-16',
            status: 'ACTIVE',
            description: 'description 1'
        },
        {
            number: nanoid(),
            depart_date: '2022-10-15',
            arrived_date: '2022-10-16',
            status: 'DONE',
            description: 'description 2'
        },
    );

    await Package.create(
        {
            trackNumber: nanoid(),
            title: 'package 1',
            amount: 1,
            price: 2345,
            flight: flight1,
            country: 'USA',
            status: 'PROCESSED',
            user: admin,
            description: 'description 1',
            urlPackage: 'https://www.amazon.com/Kindle-Now-with-Built-in-Front-Light/dp/B07DPMXZZ7/ref=sr_1_1_sspa?keywords=Kindle+E-readers&pd_rd_r=04e07f5b-9cf9-4620-81fc-3b2dc7acb927&pd_rd_w=zKeef&pd_rd_wg=arLd4&pf_rd_p=b9deb6fa-f7f0-4f9b-bfa0-824f28f79589&pf_rd_r=QEHM1VE018FEWSWN0VE0&qid=1643634774&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFMVTU2VFhQRTM5NjcmZW5jcnlwdGVkSWQ9QTAzOTMzMjk0RFBURVpKV0tPOTgmZW5jcnlwdGVkQWRJZD1BMDIxNjkzOFVBVE9CWDQ5RTUzSiZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=',
        },
        {
            trackNumber: nanoid(),
            title: 'package 2',
            amount: 1,
            price: 443,
            flight: flight1,
            country: 'Turkey',
            user: admin,
            status: 'REGISTERED',
            description: 'description 2',
            urlPackage: 'https://www.amazon.com/Stuffed-Cushion-Collectible-Christmas-Birthday/dp/B09NW4L1BW/ref=sr_1_2?keywords=toys&pd_rd_r=8d8fe069-f701-4575-99e0-fa9735c23583&pd_rd_w=U5ydA&pd_rd_wg=doX2q&pf_rd_p=779cadfb-bc4d-465d-931f-0b68c1ba5cd5&pf_rd_r=0WN5KS5HN5P88EG8PCAR&qid=1643635527&sr=8-2',
        },
        {
            trackNumber: nanoid(),
            title: 'package 3',
            amount: 1,
            price: 7564,
            flight: flight1,
            country: 'China',
            status: 'DELIVERED',
            user: user,
            description: 'description 3',
            urlPackage: 'https://www.amazon.com/Wowok-Money-Spary-Movies-Party/dp/B094D6SCL3/ref=sr_1_10?keywords=toys&pd_rd_r=8d8fe069-f701-4575-99e0-fa9735c23583&pd_rd_w=U5ydA&pd_rd_wg=doX2q&pf_rd_p=779cadfb-bc4d-465d-931f-0b68c1ba5cd5&pf_rd_r=0WN5KS5HN5P88EG8PCAR&qid=1643635567&sr=8-10'
        },
        {
            trackNumber: nanoid(),
            title: 'package 4',
            amount: 1,
            price: 678,
            flight: flight2,
            country: 'China_ground',
            status: 'ON_WAREHOUSE',
            user: user,
            description: 'description 4',
            urlPackage: 'https://www.amazon.com/JLE-Display-Apples-iPhone-Graphite/dp/B09QK7YJCZ/ref=sr_1_12?keywords=toys&pd_rd_r=8d8fe069-f701-4575-99e0-fa9735c23583&pd_rd_w=U5ydA&pd_rd_wg=doX2q&pf_rd_p=779cadfb-bc4d-465d-931f-0b68c1ba5cd5&pf_rd_r=0WN5KS5HN5P88EG8PCAR&qid=1643635567&sr=8-12',
        },
        {
            trackNumber: nanoid(),
            title: 'package 5',
            amount: 1,
            price: 345,
            flight: flight2,
            country: 'USA',
            status: 'REGISTERED',
            user: user,
            description: 'description 5',
            urlPackage: 'https://www.amazon.com/Kindle-Now-with-Built-in-Front-Light/dp/B07DPMXZZ7/ref=sr_1_1_sspa?keywords=Kindle+E-readers&pd_rd_r=04e07f5b-9cf9-4620-81fc-3b2dc7acb927&pd_rd_w=zKeef&pd_rd_wg=arLd4&pf_rd_p=b9deb6fa-f7f0-4f9b-bfa0-824f28f79589&pf_rd_r=QEHM1VE018FEWSWN0VE0&qid=1643634774&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFMVTU2VFhQRTM5NjcmZW5jcnlwdGVkSWQ9QTAzOTMzMjk0RFBURVpKV0tPOTgmZW5jcnlwdGVkQWRJZD1BMDIxNjkzOFVBVE9CWDQ5RTUzSiZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=',
        },
    );

    await News.create(
        {
            title: 'title 1',
            description: 'description 1',
            image: 'container1.jpeg',
            deleted: false,
            datetime: '2222-12-22',
        },
        {
            title: 'title 2',
            description: 'description 2',
            image: 'container2.jpeg',
            deleted: false,
            datetime: '2322-12-22',
        },
        {
            title: 'title 2',
            description: 'description 2',
            image: 'container2.jpeg',
            deleted: true,
            datetime: '2322-12-22',
        }
    );

    await Market.create(
        {
            title: 'title 1',
            image: 'amazon.png',
            url: 'https://www.amazon.com/',
            deleted: false,
        },
        {
            title: 'title 2',
            image: 'ebay.png',
            url: 'https://www.ebay.com/?mkevt=1&siteid=1&mkcid=2&mkrid=711-153320-877174-6&source_name=google&mktype=brand&campaignid=9116265290&groupid=95976135767&crlp=414435097829&keyword=ebay&targeted=kwd-11021220&MT_ID=e&adpos=&device=c&googleloc=1009827&geo_id=212&gclid=Cj0KCQiArt6PBhCoARIsAMF5wajF7BGAA0hX1vUcvT3Vg0s2K130oqDDI0S1sR_Efg0S_99_pGC9w1IaApF6EALw_wcB',
            deleted: false,
        },
        {
            title: 'title 2',
            image: 'ebay.png',
            url: 'https://www.ebay.com/?mkevt=1&siteid=1&mkcid=2&mkrid=711-153320-877174-6&source_name=google&mktype=brand&campaignid=9116265290&groupid=95976135767&crlp=414435097829&keyword=ebay&targeted=kwd-11021220&MT_ID=e&adpos=&device=c&googleloc=1009827&geo_id=212&gclid=Cj0KCQiArt6PBhCoARIsAMF5wajF7BGAA0hX1vUcvT3Vg0s2K130oqDDI0S1sR_Efg0S_99_pGC9w1IaApF6EALw_wcB',
            deleted: true,
        },
    );

    await Pages.create(
        {
            nameURL: 'rules',
            text: '<body id="tinymce" class="mce-content-body " data-id="tiny-react_46710480121644590368342" aria-label="Rich Text Area. Press ALT-0 for help." contenteditable="true" spellcheck="false"><main><div class="MuiContainer-root MuiContainer-maxWidthLg css-1oqqzyl-MuiContainer-root"><div class="MuiContainer-root MuiContainer-maxWidthLg css-1oqqzyl-MuiContainer-root"><div class="makeStyles-paper-24"><div class="makeStyles-paper-25"><h1 class="MuiTypography-root MuiTypography-h3 css-gepadz-MuiTypography-root" style="text-align: center;" data-mce-style="text-align: center;">Правила</h1></div><div class="MuiGrid-root css-vj1n65-MuiGrid-root"><div class="page-content"><p><strong>Запрещенные товары</strong></p><ul><li><strong>Новая и б/у электроника (мобильные телефоны, ноутбуки, планшеты, системные блоки, серверы).</strong></li><li><strong>Электронные сигареты, вейпы, и др. Картриджи для вейпа, жидкости и т.д.</strong></li><li>Хрупкие товары, такие как посуда, вазы, и другие стеклянные предметы (за целостность при транспортировке мы ответственности не несем);</li><li>Оружие огнестрельное, сигнальное, пневматическое, газовое, боеприпасы, холодное (включая метательное), электрошоковые устройства и искровые разрядники, а также основные части огнестрельного оружия;</li><li>Наркотики и наркотические средства любого происхождения, психотропные вещества;</li><li>Радиоактивные вещества;</li><li>Порох, взрывчатые, едкие, легковоспламеняющиеся и другие опасные вещества;</li><li>Лекарства;</li><li>Животные и растения;</li><li>Продукты питания (более чем 10 кг), алкогольные напитки, сигареты, сигары</li><li>Человеческие останки и органы;</li><li>Антиквариат;</li><li>Ювелирные изделия, драгоценные металлы и камни;</li><li>Произведения искусства;</li><li>Деньги и денежные документы в любой форме: платежные поручения, чеки, ваучеры, ценные бумаги, облигации, купоны, акции, кредитные карточки;</li><li>Почтовые марки;</li><li>Изделия и издания непристойного характера и содержания, порнография в любых видах;</li><li>Радиотелефоны;</li><li>Предметы, запрещенные к перевозке всемирной ассоциацией транспорта;</li><li>Предметы, которые по своему характеру или упаковке могут представлять опасность для работников, перемещающих посылки, пачкать или портить другие отправления и оборудование;</li><li>Бенгальские огни и феерверки;</li><li>Газы в любой упаковке, перцовые и слезоточивые газы в том числе;</li><li>Горючие жидкости;</li><li>Любое топливо и пустые емкости от него;</li><li>Лакокрасочные изделия, любые краски и раствориители к ним;</li><li><strong>Парфюм, лаки для волос или ногтей, любые спиртосодержащие жидкости (мисты от Victoria Secret в том числе)</strong></li><li>Радиоактивные материалы;</li><li>Антикаррозийные вещества;</li><li>Очистители труб;</li><li>Вещества, богатые кислородом;</li><li>Ёмкости с аэрозолями;</li><li>Баллоны для подводного плавания;</li><li>Ёмкости для пропана;</li><li>СО2 емкости;</li><li>Оружие и боеприпасы;</li><li>Порох;</li><li>Сухой лед;</li><li>Инструменты, работающие на топливе;</li><li>Зажигалки и заправки к ним;</li><li>Спички;</li><li>Блоки питания;</li><li><strong>Портативные зарядные устройства (повербанки)</strong></li><li><strong>Опасные/использованные батареи: свинцово-кислотные, щелочные (включая автомобильные аккумуляторы), новые или б/у литиевые аккумуляторы вне устройств; поврежденные аккумуляторы любого типа и использованные щелочные, никель-металл-гидридные (NiMH) или никель-кадмиевые (NiCd)&nbsp;батареи;&nbsp;</strong></li><li>Спиртосодержащие вещества, парфюм, лаки для ногтей и волос, сухие шампуни;</li><li>Подушки безопасности (Airbags);</li><li>Автоамортизаторы, прочие запчасти б/у или с присутствием смазочных жидкостей и материалов</li></ul><p><strong>Правила предоставления услуг по пересылке почтовых отправлений</strong></p><p><br></p><p><strong>1.Используемые определения</strong></p><p><br></p><p><strong>Исполнитель&nbsp;</strong>– компания Alga Express (ОсОО «Экспресс-Ю-Эс»), предоставляющая услуги по пересылке почтовых отправлений из Соединенных Штатов Америки (США) в Кыргызскую Республику в соответствии с условиями пункта 1 раздела I&nbsp;<a href="http://cbd.minjust.gov.kg/act/view/ru-ru/91076" data-mce-href="http://cbd.minjust.gov.kg/act/view/ru-ru/91076">Инструкции&nbsp;</a>«О перемещении товаров и автотранспорта через государственную границу Кыргызской Республики физическими лицами», утвержденной постановлением Правительства Кыргызской Республики «Об утверждении Инструкции о перемещении товаров и автотранспорта через государственную границу Кыргызской Республики физическими лицами» от 31 декабря 2004 года N 976.</p><p><strong>Пользователь&nbsp;</strong>– клиент компании Alga Express (ОсОО «Экспресс-Ю-Эс»), согласившийся на сотрудничество согласно настоящим Условиям.</p><p><strong>Уникальный почтовый адрес</strong>&nbsp;- почтовый адрес, находящийся на территории США, штат Делавер, который может быть использован Пользователем для получения заказов из интернет магазинов в целях дальнейшего переправления в Кыргызскую Республику. Уникальный Почтовый Адрес указан на главной странице сайта&nbsp;<a href="http://algaexpress.kg/" data-mce-href="http://algaexpress.kg/">http://AlgaExpress.kg/</a>.</p><p><strong>Заказ в интернет магазине (или заказы)</strong>&nbsp;– одна или более вещей, приобретенных Исполнителем или Пользователем в интернет магазине, отправленных из интернет магазина на Уникальный почтовый адрес Исполнителя в США, и имеющий уникальный трекинг номер.</p><p><strong>Самостоятельный заказ&nbsp;</strong>- заказ, сделанный и оплаченный Пользователем самостоятельно.</p><p><strong>Заказ через Alga Express&nbsp;</strong>- заказ, сделанный и оплаченный Alga Express по просьбе Пользователя.</p><p><strong>Трекинг номер (номер отслеживания или tracking number)&nbsp;</strong>– уникальный номер, присваиваемый почтовой или курьерской службой, для идентификации почтового отправления в системе доставки почтовой или курьерской службы, а также использующийся Исполнителем и Пользователем в целях отслеживания движения заказа.</p><p><strong>Невостребованные заказы</strong>&nbsp;– заказы, не востребованные в течение 14 календарных дней с момента доставки в г. Бишкек, Кыргызская Республика.</p><p><strong>Запрещенные товары -&nbsp;</strong>товары, которые запрещены к отправке из США в Бишкек в соответствии с законодательством США и Кыргызской Республики, а также политикой Исполнителя.</p><p><br></p><p><strong>2.Оказываемые услуги</strong></p><p>Исполнитель обязуется оказать следующие Услуги по пересылке почтовых отправлений:</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;предоставить Уникальный почтовый адрес на территории штата Делавер (США) для получения заказов, размещенных и оплаченных Пользователем или Исполнителем в интернет магазинах;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;получить Заказы, размещенные и оплаченные Пользователем или Исполнителем и доставленные почтовыми службами по Уникальному почтовому адресу;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;информировать Пользователя о движении Заказа через систему сайта&nbsp;<a href="http://algaexpress.kg/" data-mce-href="http://algaexpress.kg/">http://AlgaExpress.kg/</a>, а также по электронной почте (при условии верного оформления заказа Пользователем);</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Исполнитель строго следит за тем, чтобы к отправлению в Кыргызстан не попали товары, запрещенные к пересылке. При обнаружении запрещенных к пересылке предметов таковые изымаются из вложения. Исполнитель может осуществить возврат/пересылку по США запрещенных к отправке товаров за дополнительную плату с согласия Пользователя;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Исполнитель может оказывать дополнительные услуги (проверка содержимого заказов, дополнительная упаковка, замер и т.п.) за отдельную плату.</p><p><br></p><p><strong>3.Обязательства Исполнителя</strong></p><p>Исполнитель обязуется:</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;возместить стоимость заказа по инвойсу, если тот был утерян по вине Исполнителя (при условии предоставления Пользователем всей необходимой информации по запросу Исполнителя);</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;не разглашать и предпринять все доступные меры для обеспечения конфиденциальности информации Пользователя. Как то: паспортные данные Пользователя, операции с Заказами и Посылками.</p><p><br></p><p><strong>4.Ограничение ответственности</strong></p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Исполнитель не несет ответственности за Заказы, на которых не полностью или неверно указан Уникальный Почтовый Адрес, независимо от того, произошло это по вине магазина или Пользователя.</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Исполнитель не несет ответственности за содержимое, комплектность, соответствие артикулов, цветов и размеров Заказа незасимо от вида Заказа (Самостоятельный заказ или Заказ через Alga Express).</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Исполнитель не несет ответственности за утерю, порчу, потерю качества Заказа или составляющих его вещей, произошедших во время доставки Заказа из интернет-магазина на склад Исполнителя.</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Исполнитель не несет ответственности перед Пользователем за Посылку, конфискованную Таможенными органами Кыргызской Республики вследствие нарушения Таможенного законодательства Кыргызской Республики.</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Исполнитель не несет ответственности перед Пользователем за Невостребованные Заказы.</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Исполнитель не принимает заказы, доставку которых необходимо оплатить при получении (наложенным платежом или, иначе, COD). Любая посылка, при получении которой потребуется какая-либо оплата, не будет принята складом Исполнителя.</p><p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Исполнитель не несет ответственности за заказы, которые могут задержаться в таможенных терминалах Турции и США и подпадать под уплату таможенных или иных платежей.</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Исполнитель не несет ответственности за ювелирные украшения, поступившие и отправленные с нашего склада. Исполнитель не выплачивает компенсацию за утерю, неполучение, или получение отличных от заказанных вещей, независимо от обстоятельств.</p><p><strong>5.Обязательства Пользователя</strong></p><p>Пользователь обязуется:</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;зарегестрироваться на сайте Исполнителя, заполнив все обязательные поля и предоставив все необходимые для регистрации данные (копия действующего паспорта и проч.);</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;использовать Уникальный Почтовый Адрес при размещении Заказов в интернет магазинах;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;зарегистрировать Заказ на сайте Исполнителя, указав содержание Заказа, название интернет-магазина и трекинг номер заказа (в случаях, когда трекинг номер не предоставлен магазином/продавцом, нужно прописать “n/a” или поставить прочерк);</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;в случае отмены Заказа по инициативе интернет-магазина или Пользователя в течение 3 рабочих дней проинформировать Исполнителя;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;не включать в Заказы и не отправлять на Уникальный Почтовый Адрес вещи, запрещенные к пересылке. Полный список запрещенных к пересылке товаров размещен на сайте Исполнителя и может редактироваться;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;своевременно оплачивать Услуги Исполнителя в соответствии с действующими тарифами;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;в случае нарушения Исполнителем таможенного законодательства Кыргызской Республики, повлекшее непредвиденное начисление налогов и (или) таможенных сборов, или конфискацию Заказа, не предъявлять каких-либо требований денежного и неденежного характера к Исполнителю;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;выполнять требования таможенного законодательства Кыргызской Республики, а также требования и ограничения, установленные почтовыми и курьерскими службами США в отношении Заказов;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;регистрировать учетную запись на сайте&nbsp;<a href="http://algaexpress.kg/" data-mce-href="http://algaexpress.kg/">http://AlgaExpress.kg/</a>&nbsp;только на имя конечного получателя. Учетные записи, зарегистрированные на вымышленные имена и обнаруженные Исполнителем, будут блокироваться без предупреждения.</p><p><br></p><p><strong>6.Права Исполнителя</strong></p><p>При оказании Услуг Пользователю Исполнитель имеет право:</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;попросить предъявить паспорт Пользователя при выдаче Заказа;</p><p>-не выдавать Заказ до момента полной оплаты Пользователем услуг Исполнителя согласно тарифам;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;не отправлять из США Заказы или часть Заказов, которые относятся к категории Запрещенных товаров без предварительного предупреждения;</p><p>-не отправлять из США Заказы или часть Заказов, если они не были оформлены в надлежащем порядке на сайте Исполнителя без предварительного предупреждения;</p><p>-не отправлять из США Заказы или часть Заказов, в случае если Пользователь превысил существующие таможенные ограничения без предварительного предупреждения;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;при выполнении Упаковки использовать стандартную почтовую упаковку, которая соответствует действующим требованиям и ограничениям почтовых и курьерских служб;</p><p>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;запросить у Пользователя дополнительные документы (удостоверение личности, выписки из банка и пр.), в случае если владелец учетной записи подозревается сотрудниками Исполнителя в совершении неправомерных действий в сфере онлайн шопинга.</p><p><br></p><p><strong>7.Стоимость и Оплата</strong></p><p>Пользователь оплачивает Услуги Исполнителя в долларах США или Кыргызских сомах наличными согласно действующим Тарифам (для расчетов используется коммерческий обменный курс).</p><p><br></p><p><strong>8.Законодательство</strong></p><p>В отношении оказания Услуг применяется законодательство Кыргызской Республики.</p></div></div></div></div></div></main></body>',
        },
        {
            nameURL: 'about',
            text: '<body id="tinymce" class="mce-content-body " data-id="tiny-react_46710480121644590368342" aria-label="Rich Text Area. Press ALT-0 for help." contenteditable="true" spellcheck="false"><div class="makeStyles-paper-38"><h1 class="MuiTypography-root MuiTypography-h3 css-gepadz-MuiTypography-root" style="text-align: center;" data-mce-style="text-align: center;">О нас</h1></div><div class="MuiGrid-root css-vj1n65-MuiGrid-root"><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><strong>Мы ценим своих клиентов</strong></p>В Alga Express мы понимаем, что наши клиенты ценят свое время, деньги и хотят получать только лучшие товары для себя и своих близких. Поэтому мы предлагаем качественные и быстрые услуги по покупке и доставке товаров из интернет-магазинов США, Китая и Турции в Бишкек. У нас действуют наиболее низкие тарифы на рынке Бишкека. Цель нашей компании - сделать интернет-шоппинг доступным для большинства кыргызстанцев.<p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><strong>Почему именно мы?</strong></p>Количество людей, которые заказывают товары в интернет-магазинах, постоянно растет. Доставка из интернет-магазинов уже хорошо распространена в России и Украине, на их рынках работают десятки компаний, подобных Alga Express. Мы используем опыт самых успешных компаний в этой сфере, чтобы подарить своим клиентам наиболее качественные, доступные и быстрые услуги по доставке товаров из интернет-магазинов.<p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><strong>Как это работает?</strong></p>После оформления покупок в интернет-магазинах все заказы поступают на наш основной склад. Далее посылки консолидируются и еженедельно доставляются самолетом в Бишкек. Сроки доставки - 10-12 рабочих дней со дня отправки. В результате Вы экономите на покупке и доставке и получаете товары отличного качества в короткие сроки.</div></body>',
        },
        {
            nameURL: 'contacts',
            text: '<body id="tinymce" class="mce-content-body " data-id="tiny-react_46710480121644590368342" aria-label="Rich Text Area. Press ALT-0 for help." contenteditable="true" spellcheck="false"><div class="makeStyles-paper-31"><div class="makeStyles-paper-32"><h1 class="MuiTypography-root MuiTypography-h3 css-gepadz-MuiTypography-root" style="text-align: center;" data-mce-style="text-align: center;">Контакты</h1></div><div class="MuiGrid-root css-vj1n65-MuiGrid-root"><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><b>Бишкек</b></p><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Юнусалиева, 142</p><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Тел.: 0 774 769 434 (Выкуп), ️0 702 465 333 (Склад)</p><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><a class="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-1iwtne7-MuiTypography-root-MuiLink-root" href="https://api.whatsapp.com/send?phone=996774769434" data-mce-href="https://api.whatsapp.com/send?phone=996774769434">WhatsApp</a></p><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><a class="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-1iwtne7-MuiTypography-root-MuiLink-root" href="https://www.instagram.com/alga_express/" data-mce-href="https://www.instagram.com/alga_express/">Instagram</a></p><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><strong>График работы:</strong></p><ul><li>Пн: 11:00-18:00</li><li>Вт: 11:00-18:00</li><li>Ср: 11:00-18:00</li><li>Чт: Выходной</li><li>Пт: 11:00-18:00</li><li>Сб: 10:00-18:00</li><li>Вс: 11:00-15:00</li></ul></div><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><strong>Склад в Китае</strong></p><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Адрес склада в Китае</div><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><strong>Склад в Турции</strong></p><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Sehir: Istanbul</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Adress: Langa hisari cad 46 (Alga Express Kargo)</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Ilce: Fatih</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Mahallesi: Katipkasim</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Post kod: 34130</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Tel: 05550206083</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Yenikapi: laleli</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Ad: Ваше имя</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Soyad: Фамилия</div></div><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><strong>Склад в США</strong></p><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Безналоговый штат (по поводу заказа электроники: мобильных телефонов, смарт часов, ноутбуков обращайтесь к менеджеру)</p><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Получатель: *Имя Фамилия* латиницей</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Адресная строка 1: *41B Germay Drive*</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Адресная строка 2: *ALGA-KG1* указывать обязательно!</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Город: *Wilmington*</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Штат: *DE (Delaware)*</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Почтовый код: *19804*</div><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Телефон: *+1 (302) 669-1014*</div></div><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><strong>Информация</strong></p><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">От вас требуется фото вашего паспорта с обеих сторон для растаможки, email. Прошу Вас обратить внимание на адрес 41 "B" не пропустите, при сохранении адреса на сайтах сохраняйте тот, который вы ввели вручную, а не тот который предлагает сайт). После оформления заказа на наш склад, как только вам выдадут трек-код, отправьте мне в обязательном порядке следующую информацию трек-код, вид посылки, цены, магазин. Это для регистрации, иначе ваша посылка не вылетит!</p><div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"><p class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">Сроки: 5-7 дней с момента вылета груза. Отправка каждые 10-12 дней.</p>Округление от 0,1 до 0,5 - как 0,5, выше всё по факту.</div></div></div></div></div></body>',
        },
        {
            nameURL: 'how',
            text: '<body id="tinymce" class="mce-content-body " data-id="tiny-react_46710480121644590368342" aria-label="Rich Text Area. Press ALT-0 for help." contenteditable="true" spellcheck="false"><div class="MuiContainer-root MuiContainer-maxWidthLg css-1oqqzyl-MuiContainer-root"><div class="makeStyles-paper-24"><h1 class="MuiTypography-root MuiTypography-h3 css-gepadz-MuiTypography-root" style="text-align: center;" data-mce-style="text-align: center;">Как это работает</h1></div><div class="MuiGrid-root css-vj1n65-MuiGrid-root"><div><h4><strong>Alga Express</strong>&nbsp;–простой и проверенный сервис по пересылке заказов из интернет-магазинов США и Турции в Кыргызстан.</h4><p><br></p><p>Мы предоставляем почтовый адрес в&nbsp;<strong>США и Турции</strong>, благодаря чему наши клиенты получают возможность самостоятельно делать покупки в интернет-магазинах и отслеживать их перемещение&nbsp; на сайте AlgaExpress.kg до прибытия посылки на склад в Бишкек, Кыргызстан.</p><p><br></p><h3><strong>1. Выкуп с интернет-магазинов</strong></h3><p>Наши клиенты сами или с помощью сотрудников Alga Express оформляют покупку в любых интернет-магазинах США и/или Турции, указывая соответствующий адрес доставки:</p><p><br></p><h3><strong>2. Прием, упаковка, проверка и пересылка посылок</strong></h3><p>Мы принимаем посылки наших клиентов на соответствующих складах и осуществляем подготовку к отправке в Кыргызстан, Бишкек.</p><p><br></p><h3><strong>3. Выдача посылок</strong></h3><p>Посылки прибывают в течение 5-7 дней с момента отправки со складов США и Турции. Наши клиенты получат соответствующие уведомления о прибытии посылок на сайте AlgaExpress.kg, а также письменную рассылку на почту, указанную при регистрации на сайте.</p></div></div></div></body>',
        },
        {
            nameURL: 'faq',
            text: '<body id="tinymce" class="mce-content-body " data-id="tiny-react_46710480121644590368342" aria-label="Rich Text Area. Press ALT-0 for help." contenteditable="true" spellcheck="false"><div class="makeStyles-paper-31"><h1 class="MuiTypography-root MuiTypography-h3 css-gepadz-MuiTypography-root" style="text-align: center;" data-mce-style="text-align: center;">Вопрос-ответ</h1></div><div class="MuiGrid-root css-vj1n65-MuiGrid-root"><div class="page-content"><p><strong>Q: Зачем покупать в США? В чем смысл?</strong>&nbsp;</p><p><strong>A:</strong>&nbsp;Многим известно отличное соотношение цены и качества товаров, продающихся в США. Покупая в американских магазинах, Вы можете быть уверенны, что приобретете товар отличного качества по наиболее низкой цене. Нельзя также забывать про ОГРОМНЫЕ распродажи, когда скидки на товары могут достигать 90%. Для сравнения можете открыть любой интернет-магазин, выбрать интересующий Вас товар и сравнить цены с местными.</p><p><br></p><p><strong>Q: Зачем вам копия моего паспорта?</strong>&nbsp;</p><p><strong>A:</strong>&nbsp;Копии паспортов клиентов необходимы для предъявления сотрудникам таможенной службы при получении груза.</p><p><br></p><p><strong>Q: Почему ваши услуги относительно дешевые?</strong></p><p><strong>A:</strong>&nbsp;Наша компания сотрудничает с одним из крупных и проверенных перевозчиков из США в СНГ, что позволяет нам получать низкие цены на перевозку из США в Кыргызстан.</p><p><br></p><p><strong>Q: Я бы хотел самостоятельно оформлять заказы в американских интернет магазинах. Что для этого нужно?</strong>&nbsp;</p><p><strong>A:</strong>&nbsp;Прежде всего, Вам необходимо иметь банковскую карту (чаще всего VISA) с наличием достаточной для покупки суммы на счете и далее следовать.</p><p><br></p><p><strong>Q: А можно ли доверять интернет магазинам? Не пропадут ли мои деньги?</strong>&nbsp;</p><p><strong>A:</strong>&nbsp;Интернет-шоппинг во всем мире, и особенно в США, набирает большие обороты. Большое количество онлайн-магазинов концентрируются только на торговле по интернету. Таким магазинам очень важно мнение клиентов об их работе, так как в интернете очень легко найти любую негативную информацию. Кроме того, законодательство США строго конролирует их деятельность. Наш список онлайн-магазинов содержит наиболее популярные площадки, где Вы сможете найти любую интересующую Вас продукцию. Если Вы хотите сделать заказ в интернет-магазине, не входящем в этот список, мы Вам в этом поможем.</p></div></div></body>',
        },
    );

    await mongoose.connection.close();
};

run().catch(console.error);

