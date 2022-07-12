<template>
        <div class="companyInfo">
            <h1>{{daily.ticker}}</h1>
            <div class="star" v-show="received" @click="save">
            <img v-if="saved" src="./icons/star-fill.svg">
            <img v-else src="./icons/star.svg" >
            </div>
            <h1 class="stockPrice" v-bind:class="{ colordisplay: up }">{{ iex.last }}</h1>
            <div class="UPorDOWN" v-show="received"  v-bind="dailyGain">
                <img v-if="up" src="./icons/up.svg" >
                <img v-else src="./icons/down.svg">
            </div>
        </div>
        <div class='dailyChange'>
            <p class="companyName">{{ daily.name }}</p>
            <span v-bind:class="{ colordisplay: up }"> {{changeInPoints}} ({{changeInPercent}})</span>
            <br>
            <br>
        </div>
        <div class="exchangeCode">
             <p> {{daily.exchangeCode}}</p>
             <!-- 按钮触发模态框 -->
            <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Buy</button>

            <!-- 模态框（Modal） -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span style="color:black;font-size:20px">{{daily.ticker}}</span>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <h4>Current Price: {{iex.last}}</h4>
                            <h4>Quantity:<input type="number" min="0" @input="getQuantity"></h4>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" style="background-color:grey">Close</button>
                        <button type="button" class="btn btn-primary" @click="buy">Buy</button>
                        </div>
                    </div><!-- /.modal-content -->
                    </div>
            </div>    
             <br>
             <br>
             <div v-bind="status">
                 <p v-if="marketStatus" style="text-align: center;">Market is Open</p>
                 <p v-else style="text-align: center;">Market is Closed</p>
                 <br>
                 <br>
             </div>
        </div>
        <div class="subHeader">
        <ul class="nav masthead-nav">
            <li><button @click="Summary" ref='summary'>Summary</button></li>
            <li><button @click="TopNews">Top News</button></li>
            <li><button @click="chart">Charts</button></li>
        </ul>
        <br>
        </div>
        <div class="detail-data" v-show="showSummary">
            <div class="description">
                    <dl>
                        <dt>High Price: {{ iex.high }}</dt>
                        <dt>Low Price: {{ iex.low }}</dt>
                        <dt>Open Price: {{ iex.open }}</dt>
                        <dt>Prev. Close: {{ iex.prevClose }}</dt>
                        <dt>Volume: {{ iex.volume }}</dt>   
                    </dl>
                <div class="company-description">
                        <h3> Company's Description</h3>
                        <p>Start Date: {{daily.startDate}}</p>
                        <div class="box">
                        <p style="overflow:scoll;">{{daily.description}}</p>
                        </div>
                </div>
            </div>
            <div class="miniChart" v-if="readyChart">
                <MiniChart :Data="chartData"></MiniChart>
            </div>
        </div>
    <div class="top-news" v-show="showTopNews">
        <div class="card" style="width: 15em; display:inline-block;" v-show="news_one">
                <a href="" ref = "url1" target = "_blank"><img src="" class="card-img-top" style="width: 18rem;" ref = "image1" alt="..."></a>
                <div class="card-body">
                <h5 class="card-title">{{ news[0].title}}</h5>
                <p class="card-text" style="overflow:hidden; max-height:100px;">{{ news[0].description }}</p>
                <p class="card-text"><small class="text-muted">{{news[0].publishedAt}}</small></p>
                </div>
        </div>
         <div class="card" style="width: 15em; display:inline-block;" v-show="news_two">
                <a href="" ref = "url2" target = "_blank"><img src="" class="card-img-top" style="width: 18rem;" ref = "image2" alt="..."></a>
                <div class="card-body">
                <h5 class="card-title">{{ news[1].title}}</h5>
                <p class="card-text" style="overflow:hidden; max-height:100px;">{{ news[1].description }}</p>
                <p class="card-text"><small class="text-muted">{{news[1].publishedAt}}</small></p>
                </div>
        </div>
          <div class="card" style="width: 15em; display:inline-block;" v-show="news_three">
                <a href="" ref = "url3" target= "_blank"><img src="" class="card-img-top" style="width: 18rem;" ref = "image3" alt="..."></a>
                <div class="card-body">
                <h5 class="card-title">{{ news[2].title}}</h5>
                <p class="card-text" style="overflow:hidden; max-height:100px;">{{ news[2].description }}</p>
                <p class="card-text"><small class="text-muted">{{news[2].publishedAt}}</small></p>
                </div>
        </div>
        </div>
        <div class="detailed-chart" v-show="showCharts">
            <div v-if="readyDetailChart">
            <DetailChart :Data="detailChart"></DetailChart>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
import MiniChart from './MiniChart.vue'
import DetailChart from './DetailChart.vue'

export default {
    props:{
        ticker:{type:String},
    },
    components: {
        MiniChart,
        DetailChart
    },
    data() {
        return {
            quantity:"",
            iex: [],
            daily: [],
            saved:false,
            received:false,
            up:true,
            date: "",
            weekago:"",
            news: [ {}, {}, {}],
            changeInPoints:'',
            changeInPercent:'',
            marketStatus:'',
            showSummary:true,
            showTopNews:false,
            showCharts:false,
            chartData:[],
            chartDate:[],
            detailChart:[],
            news_one:false,
            news_two:false,
            news_three: false,
            readyChart:false,
            readyDetailChart:false
        }
    },
    methods: {
        getQuantity(e) {
            this.quantity = e.target.value.replace(/[^0-9]/g, '');
        },
        buy() {
            if(localStorage.hasOwnProperty(this.daily.ticker) == true) {
                var holding = JSON.parse(localStorage.getItem(this.daily.ticker)).quantity;
                var cost = JSON.parse(localStorage.getItem(this.daily.ticker)).totalCost;
                cost = (cost + this.iex.last * this.quantity).toFixed(2);
                this.quantity = parseInt(this.quantity) + parseInt(holding);
                var avgCost = (cost / this.quantity).toFixed(2);
                console.log(holding);
                let position = {
                    ticker:this.daily.ticker,
                    quantity: this.quantity,
                    avgCost:avgCost,
                    totalCost: cost
                }
                localStorage.setItem(this.daily.ticker, JSON.stringify(position))
            }
            else {
                let position = {
                    ticker:this.daily.ticker,
                    quantity: this.quantity,
                    avgCost:this.iex.last,
                    totalCost: this.iex.last * this.quantity,
                    name:this.daily.name
                }
                localStorage.setItem(this.daily.ticker, JSON.stringify(position))
            }
            console.log(this.quantity);
        },
        chart() {
            this.showSummary = false;
            this.showTopNews = false;
            this.showCharts = true;
        },
        TopNews() {
            this.showSummary = false;
            this.showTopNews = true;
            this.showCharts = false;
        },
        Summary() {
            this.showSummary = true;
            this.showTopNews = false;
            this.showCharts = false;
        },
        focusSumary() {
            this.$refs.summary.focus();
        },
        save() {
            if(localStorage.hasOwnProperty(this.daily.name) == false) {
                this.saved = true;
                let watchlist = {
                    ticker: this.daily.ticker,
                    name: this.daily.name,
                    last: this.iex.last,
                    points: this.changeInPoints,
                    percent: this.changeInPercent
                }
                localStorage.setItem(this.daily.name, JSON.stringify(watchlist));
                /*if(localStorage.hasOwnProperty("key") == false)
                    localStorage.setItem("key", "0");
                else {
                    var index = JSON.parse(localStorage.getItem("key"));
                    index++;
                    localStorage.setItem("key",index);
                }*/
            } else {
                this.saved = false;
                if(localStorage.hasOwnProperty(this.daily.name) == true)
                {
                    localStorage.removeItem(this.daily.name);
                }
            }
        },

        getDate() {
            let yyyy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            this.date = yyyy+ '-' + mm + '-' +dd;
            console.log(this.date);
            // .toJSON() output UTC timezone.
            //this.date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
            return this.date;
        },
        getDateWeekAgo() {
            var now = new Date();
            var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
            var yyyy = date.getFullYear();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            this.weekago = yyyy+'-'+ mm + '-' + dd;
            console.log(this.weekago);
            return this.weekago;
        }, 
        getDateYearAgo() {
            var now = new Date();
            now.setFullYear(now.getFullYear() - 1);
            console.log(now.toLocaleDateString())
            return now;
        },

        dailyGain(){
            this.changeInPoints = (this.iex.last - this.iex.prevClose).toFixed(2);
            this.changeInPercent = ((this.changeInPoints/this.iex.prevClose) * 100).toFixed(2) + "%";
            console.log(this.changeInPoints);
            console.log(this.changeInPercent);
            if(this.changeInPoints >= 0) {
                this.up = true;
            }
            else{
                this.up = false;
            }
        },
        status() {
            if(this.iex.bidPrice === null)
            {
                this.marketStatus = false;
            }
            else
            {
                this.marketStatus = true;
            }
        },

        isSaved() {
            if(localStorage.hasOwnProperty(this.daily.name) == true) {
                console.log(localStorage.hasOwnProperty(this.daily.name));
                this.saved = true;
            }
        }
    },
    mounted() {
       /* setInterval(() => {
            this.dailyGain();
        }, 5000),*/
        axios.
            get(`http://localhost:3001/daily/${this.ticker}`)
            .then(response => {
                this.daily = response.data;
                this.received = true;
                this.isSaved();
            })
            .catch(function (error) {
                if(error.response) {    //返回状态码不在2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if(error.request) { //没有返回
                    console.log(error.request)
                } else {
                    console.log('Error',error.message);
                }
                console.log(error.config);
            })
        
        axios.
            get('http://localhost:3001/iex/', {
                params:{
                    tickers:this.ticker
                }
            })
            .then(response => {
                this.iex = response.data[0];
                this.dailyGain();
                this.status();
                this.focusSumary();
            })

        axios.
            get('http://localhost:3001/news', {
                params: {
                    q:this.ticker,
                    from:this.getDate(),
                    sortBy:'popularity'
                }
            })
            .then(response => {
                this.news = response.data.articles;
                if(this.news.length >= 1) {
                    this.news_one = true;
                    this.$refs.image1.src = this.news[0].urlToImage;
                    this.$refs.url1.href = this.news[0].url;
                }
                if(this.news.length >= 2) {
                    this.news_two = true;
                    this.$refs.image2.src = this.news[1].urlToImage;
                    this.$refs.url2.href = this.news[1].url;
                }
                if(this.news.length >= 3) {
                    this.news_three = true;
                    this.$refs.image3.src = this.news[2].urlToImage;
                    this.$refs.url3.href = this.news[2].url;
                }
            })

      /*  axios.
            get(`http://localhost:3001/daily/${this.ticker}/prices`, {
                params: {
                    startDate:this.getDateWeekAgo(),
                    resampleFreq:'daily'
                }
            })*/
        axios.
            get(`http://localhost:3001/daily/${this.ticker}/prices`, {
                params: {
                    startDate:this.getDateWeekAgo(),
                    resampleFreq:'daily'
                }
            })
            .then(response => {
                /*this.chartData = response.data;
                console.log(this.chartData);*/
                this.readyChart = true;
                var array = new Array();
                for(var i = 0; i < response.data.length; i++)
                {   
                    this.chartData[i]= response.data[i].close;
                    this.chartDate[i] = Date.parse(response.data[i].date.slice(0,10));
                    array[i] = new Array();
                    array[i][0] = this.chartDate[i];
                    array[i][1] = this.chartData[i];
                }
                this.chartData = array;
                //stockInit(Highcharts);
            }),

        axios.
            get(`http://localhost:3001/daily/${this.ticker}/prices`, {
                params: {
                    startDate:this.getDateYearAgo(),
                    resampleFreq:'daily'
                }
            })
            .then(response => {
                this.readyDetailChart = true;
                var array = new Array();
                for(var i = 0; i < response.data.length; i++)
                {
                    this.chartDate[i] = Date.parse(response.data[i].date.slice(0,10));
                    this.detailChart[i] = response.data[i].close;
                    array[i] = new Array();
                    array[i][0] = this.chartDate[i];
                    array[i][1] = this.detailChart[i];
                }
                this.detailChart = array;
            })

       /* axios.
            get('http://localhost:3001/search', {
            params: {
                query:this.ticker,
            }
            })
            .then(response => {
                this.info = response.data[0];
                this.received = true;
                })
            .catch(function (error) {
                if(error.response) {    //返回状态码不在2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if(error.request) { //没有返回
                    console.log(error.request)
                } else {
                    console.log('Error',error.message);
                }
                console.log(error.config);
            })*/
    }
}
</script>

<style>
.companyInfo {
    margin: 0px 20px auto;
    margin-top: 20px;
    text-align: left;
}
.companyInfo h1 {
    display: inline-block;
    color:white;
    margin:0 auto;
    margin-right: 20px;
}
.companyInfo .stockPrice {
    color:red;
    float:right;
    margin-right: 0px;
    width: max-content;
    padding: 0 10px;
}
.dailyChange .companyName {
    float: left;
    font-size: 20px;
    margin: 0 20px auto;
}
.dailyChange span{
    color:red;
    float:right;
    margin: 0 20px auto;
    font-size: 20px;
}
.exchangeCode p{
    margin: 0 20px auto;
    text-align: left;
}
.star,
.star img{
    display:inline-block;
    width:40px;
    transform: translateY(-5px);
}
.star img:hover{
    cursor: pointer;
}

.UPorDOWN {
    float: right;
}
.companyInfo .colordisplay{
    color:green;
}
.dailyChange .colordisplay{
    color:green;
}

.subHeader .nav {
    float: none;
}
.subHeader .nav li {
    margin: 0 20px auto;
    font-size: 15px;
    color:#7ba7ab;
}
.subHeader .nav li button{
    background-color: transparent;
}
.subHeader .nav li button:hover{
     border-bottom: 2px solid #7ba7ab;
}
.subHeader .nav li button:focus{
    border-bottom: 2px solid white;
}

.detail-data {
    min-height: 400px;
    max-height: 400px;
    color:white;
    margin: 0 10px auto;
}
.description {
    float:left;
    width:40%;
    margin:0 10px auto;
}
.box {
    max-height: 200px;
    overflow: scroll;
}

.detail-data .miniChart{
    display: inline;
    margin:0 10px auto;
    width: 50%;
    float:right;
}

.modal-body{
    height:110px;
    text-align: left;
}
.modal-body h4{
    color: black;
    text-shadow: none;
}
.modal-body input{
    width: 30%;
    font-size: 18px;
}
</style>