var atob = require('atob');
const tokenId = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjdmNTQ4ZjY3MDg2OTBjMjExMjBiMGFiNjY4Y2FhMDc5YWNiYzJiMmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NTQzMjYwODc3NzctMW5zMTdkN3Jtc3JmNzdsOG0zcGc3YTI1cGRwdjFrc2ouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NTQzMjYwODc3NzctMW5zMTdkN3Jtc3JmNzdsOG0zcGc3YTI1cGRwdjFrc2ouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTYwNzE4MTA0MDQzMTQzODYxMTciLCJlbWFpbCI6Im5oaXRoYW5odHJhbmhvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRW81RWhTWFZYNi1xcmZaTlhTSmZ5QSIsIm5hbWUiOiJOaOG7iyBUaGFuaCBUcuG6p24gSOG7kyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaGZtQ3FNSFM2ejdscUZONHk1M1M0RVBtWWptZGhsRk8tNG4yMVNJQT1zOTYtYyIsImdpdmVuX25hbWUiOiJOaOG7iyBUaGFuaCIsImZhbWlseV9uYW1lIjoiVHLhuqduIEjhu5MiLCJsb2NhbGUiOiJ2aSIsImlhdCI6MTYyNjc3MTY0MSwiZXhwIjoxNjI2Nzc1MjQxfQ.G1fX2gCx91RJaoOvKapUIT_nPhnuiHzv12AOjcp57DsEwbe7mWXsfuraVT0vxXXX1irOWTzRdoQ-pB5-r_pgMXsn8bqlBUbRYE-lk-gkUkolNzkNv5FIePbcxm5xFj6WQ6At8Pewrc8XP4iHwVrun_MWVDWyv9UqEUwVlUXgfizmpmbnr3nOpNXu5moLbTGcdomL9AyREs_7p5jCJqs6uERkz8wa0ybob0D9bPzqNfPLwtU1kVc13Btr6ByyVqRAvKdkYp6EWLrjGNAXzMuY0Dgn3qx1ZEfvr7WZPcbDak9SmjWHbo3F0j2jcggc8b7foLl6iyJZX7ynPBctxs2w0A`

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

console.log(parseJwt(tokenId))