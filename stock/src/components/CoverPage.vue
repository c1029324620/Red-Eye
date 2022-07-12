<template>
    <h1 class="cover-heading">Stock Search</h1>
    <div class="cover-container">
        <div class="search bar">
            <div class="autocomplete">
               <!-- <input v-model="text" @input="onInput" @keyup.enter="search" placeholder="Enter stock name..."/>-->
                <input v-model="text" placeholder="Enter a Stock Name..." @input="change(onInput,200)" @keyup.enter="search"/>
                <button :value="text" @click="search"></button>
                <ul v-show="isOpen" class="autocomplete-results">
                    <li v-for="(result, i) in results" :key="i" class="autocomplete-result" @click="setResult(result)">
                        {{ result }}
                        <span class="name">{{ nameList[i]}}</span>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    <div class="mastfoot">
        <div class="inner">
            <p>Power by <a href="https://api.tiingo.com/" target="_blank">Tiingo</a>. Developed by Kevin Cao</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { vue3Debounce} from 'vue-debounce'
import Details from './Details.vue'

export default {
    components: {
        Details
    },
     directives: {
        debounce: vue3Debounce({lock: true})
    },
    data() {
        return {
            text:'',
            info: null,
            tickerList: [],
            nameList: [],
            isOpen: false,
            results: [],
            timer:null
        }
    },
    methods: {
        change(fn, delay) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                fn()
            }, delay)
        },
        search() {
            console.log(this.text)
            if(this.text !== '') {
            this.$router.push({
                name:'details', params: { id:this.text}})
            }
        },

        filterResults() {
            this.results = this.tickerList.filter(ticker => ticker.toLowerCase().indexOf(this.text.toLowerCase()) > - 1)
        },

        setResult(result) {
            this.text = result;
            this.isOpen = false;
            this.$router.push({
                name:'details', params: { id:this.text}
            })
        },
        onInput() {
            if(this.text !== '') {
                console.log(this.text);
                axios
                    .get('http://localhost:3001/search', {
                    params: {
                        query:this.text
                    }
                    })
                    .then(response => {
                        this.info=response.data;
                        this.tickerList = [];
                        this.nameList = [];
                        for(var i = 0; i < this.info.length; i++){
                            this.tickerList[i] = this.info[i].ticker;
                            this.nameList[i] = this.info[i].name;
                        }
                        console.log(this.tickerList);
                        this.isOpen = true;
                        this.filterResults();
                    })
            }
            else if(this.text === ''){
                this.isOpen = false;
            }
            /*if(e.target.value !== '') {
                this.text=e.target.value;
            axios
                .get('http://localhost:3001/search', {
                    params: {
                        query:this.text
                    }
                    })
                .then(response => {
                    this.info = response.data;
                    this.tickerList = [];
                    this.nameList = [];
                    for(var i = 0; i < this.info.length; i++){
                        this.tickerList[i] = this.info[i].ticker;
                        this.nameList[i] = this.info[i].name;
                    }
                    console.log(this.tickerList);
                    this.isOpen = true;
                    this.filterResults();
                })
            }
            else if(this.text === ''){
                this.isOpen = false;
            }*/
        }
    }
}
</script>

<style>

.cover-heading {
    font-size: 70px;
}
::-webkit-input-placeholder {
    color: black;
}
input, button {
    border:none;
    outline: none;
}

input {
    width:100%;
    height:40px;
    padding-left: 13px;
    padding-right: 46px;
    font-size: 20px;
    color:rgb(31, 70, 5);
}

.bar button {
    height: 40px;
    width:40px;
    cursor: pointer;
    border-top: 2px solid #7ba7ab;
    border-bottom: 2px solid #7ba7ab;
    background-color: white;
    background-image: url('../components/icons/search.png');
    background-repeat: no-repeat;
    background-position: 50%;
    right: 6%;
    position:absolute;
}
div.search {
    padding: 30px 0;
    position: relative;
    width: 300px;
    margin:0 auto;
}

.bar input {
    border: 2px solid #7ba7ab;
    border-radius: 50px;
}

.autocomplete {
    position:relative;
}

.autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #7ba7ab;
    height:300px;
    min-height: 1em;
    max-height: 240px;
    overflow:auto;
    background-color: white;
    color: rgb(31, 70, 5);
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer
}

.autocomplete-result:hover {
    background-color: #4aae9b;
    color:white
}

span.name {
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    color: blue;
    word-break: keep-all;
    white-space: nowrap;
}
</style>