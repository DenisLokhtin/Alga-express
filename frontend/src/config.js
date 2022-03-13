export let apiURL = 'http://localhost:8000';
export const googleClientId = '810927471031-rp610u0qpftkde3e8u3v9vjeauap6nfc.apps.googleusercontent.com';

if (process.env.REACT_APP_ENV ==='test') {
    apiURL = 'http://localhost:8010';
}

if (process.env.NODE_ENV === 'production') {
    apiURL = 'https://alga-express.ddns.net/api';
}