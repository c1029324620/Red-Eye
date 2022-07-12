const express = require('express')
var cors = require('cors')
const { createProxyMiddleware } = require ("http-proxy-middleware");
const { request } = require('express');
const proxy = require('express-http-proxy')

const app = express();
const port = 3001;
const host = "localhost"
const API_BASE_URL = "https://api.tiingo.com/tiingo/utilities/search";
const API_KEY_VALUE = "b6b0f3b6233249f339f26db0764b9df0b6b7af29";
const API_DAILY_URL = "https://api.tiingo.com/tiingo/daily/";
const API_IEX_URL = "https://api.tiingo.com/iex/";

const NEWS_API_KEY = "6ec527968d404e808dde312ea3c2c2e5";
const API_NEWS_URL = "https://newsapi.org/v2/everything";
/*https://api.tiingo.com/tiingo/utilities/search?query=aapl&token=b6b0f3b6233249f339f26db0764b9df0b6b7af29
https://api.tiingo.com/iex/?tickers=<ticker>&token=<APIKeyTiingo>
https://newsapi.org/v2/everything?q=<ticker>&from=2022-06-08&sortBy=popularity&apiKey=API_KEY
*/
app.use(cors())

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });


/*app.use('/search', proxy(API_BASE_URL, {
    forwardPath: function(req, res) {
        API_BASE_URL = `${API_BASE_URL}?query=${req.query.query}&token=${API_KEY_VALUE}`
    }
}))*/
//?query=apple&token=${API_KEY_VALUE}

//500 Internal Server Error
/*
app.get('/search', function (req, res, next) {
    API_SERVICE_URL = `${API_BASE_URL}?query=${req.query.query}&token=${API_KEY_VALUE}`,
    next(
        createProxyMiddleware({
            target: API_SERVICE_URL,
            changeOrigin: true,
            pathRewrite: {
                '^/search':"",
            }
        })
    )
})*/

//稍微可行的

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
            auth: 'c1029324620:cgg2022',
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
            auth: 'c1029324620:cgg2022',
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
            auth: 'c1029324620:cgg2022',
            //auth: 'Token b6b0f3b6233249f339f26db0764b9df0b6b7af29',
            changeOrigin: true,
            pathRewrite: {
                '^/search': "",
        },
    })
);



app.listen(port, host, () => {
    console.log(`starting proxy at ${host}:${port}`)
})

/*
app.use(async (req, res) => {
    let resp = await axios ({
        baseURL: 'https://api.tiingo.com/',
        method: 'get',
        url:'/api/tiingo/utilities/search/apple'
    })
    res.send(resp.data)
})

app.listen(port, () => {
    console.log(`listening on localhost: ${port}`)
})*/
