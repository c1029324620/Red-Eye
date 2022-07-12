const express = require('express')
var cors = require('cors')
const { createProxyMiddleware } = require ("http-proxy-middleware");
const { request } = require('express');
const proxy = require('express-http-proxy')

const app = express();
const port = 3001;
const host = "localhost"
const API_BASE_URL = "https://api.tiingo.com/tiingo/utilities/search";
const API_KEY_VALUE = "replace with your own API key";  //replace this with your own tiingo API key
const API_DAILY_URL = "https://api.tiingo.com/tiingo/daily/";
const API_IEX_URL = "https://api.tiingo.com/iex/";

const NEWS_API_KEY = "replace with your own API key"; //replace this with your own NewsApi key 
const API_NEWS_URL = "https://newsapi.org/v2/everything";
app.use(cors())

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

app.use(
    '/news',
        createProxyMiddleware({
            onProxyReq(proxyReq, req, res) {
                proxyReq.setHeader('Authorization', NEWS_API_KEY)
            },
            target:API_NEWS_URL,
            changeOrigin:true,
            pathRewrite: {
                '^/news': "",
            }
        })
)

app.use(
    '/iex/',
        createProxyMiddleware({
            target:API_IEX_URL,
            auth: 'username:password',  //your username and password
            changeOrigin: true,
            pathRewrite: {
                '^/iex/': "",
            }
        })
)

app.use(
    '/daily/', 
        createProxyMiddleware ({
            target: API_DAILY_URL,
            auth: 'username:password', //your username and password
            changeOrigin:true,
            pathRewrite: {
                '^/daily/': "",
            }
        })
);

app.use(
    '/search',
        createProxyMiddleware ({
            target: API_BASE_URL,
            auth: 'username:password', //your username and password
            changeOrigin: true,
            pathRewrite: {
                '^/search': "",
        },
    })
);



app.listen(port, host, () => {
    console.log(`starting proxy at ${host}:${port}`)
})
