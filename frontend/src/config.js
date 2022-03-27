export let apiURL = 'http://localhost:8000';
// export let apiURL = 'http://172.29.176.99:8000';


if (process.env.REACT_APP_ENV ==='test') {
    apiURL = 'http://localhost:8010';
}

if (process.env.NODE_ENV === 'production') {
    apiURL = 'https://alga-express.ddns.net/api';
}