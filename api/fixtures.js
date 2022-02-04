const mongoose = require("mongoose");
const config = require("./config");
const {nanoid} = require("nanoid");
const User = require("./models/User");
const Payment = require("./models/Payment");
const Package = require("./models/Package");
const Flight = require("./models/Flight");
const News = require("./models/News");
const Market = require("./models/Market");

const run = async () => {
    await mongoose.connect(config.db.url, config.db.options);
    console.log('fixtures');

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user, admin] = await User.create(
        {
            email: "user@gmail.com",
            password: "123",
            token: nanoid(),
            role: "user",
            balance: 7093,
            name: "User",
            avatar: 'avatar1.jpeg',
            phone: {number: '786 67 78 99', type: 'PHONE'},
            passport: {image: 'passport.jpg'}
        },
        {
            email: "admin@gmail.com",
            password: "123",
            token: nanoid(),
            role: "admin",
            balance: 5908,
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
            status: true,
            image: 'payment.png',
        },
        {
            description: 'Payment Description 2',
            user: user,
            status: false,
            image: 'payment.png',
        },
        {
            description: 'Payment Description 3',
            user: admin,
            status: true,
            image: 'payment.png',
        },
        {
            description: 'Payment Description 4 ',
            user: admin,
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
            width: 42,
            length: 42,
            height: 42,
            deleted: false,
            user: admin,
            cargoWeight: 3,
            cargoPrice: 123,
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
            width: 42,
            length: 42,
            height: 42,
            deleted: false,
            user: admin,
            cargoWeight: 3,
            cargoPrice: 123,
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
            width: 42,
            length: 42,
            height: 42,
            status: 'DELIVERED',
            deleted: false,
            user: user,
            cargoWeight: 3,
            cargoPrice: 123,
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
            width: 42,
            length: 42,
            height: 42,
            status: 'REGISTERED',
            deleted: false,
            user: user,
            cargoWeight: 3,
            cargoPrice: 123,
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
            width: 42,
            length: 42,
            height: 42,
            status: 'DONE',
            deleted: true,
            user: user,
            cargoWeight: 3,
            cargoPrice: 123,
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

    await mongoose.connection.close();
};

run().catch(console.error);
