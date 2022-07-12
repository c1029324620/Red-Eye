<template>
    <div>
        <highcharts :constructorType="'stockChart'" class="hc" :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
    props: {
        Data:{type:Object},
    },
    components: {
        highcharts: Chart
    },
    data() {
        return {
            chartOptions: {
                series: [{
                    name: "Close Price",
                    data: this.Data
                }],
                rangeSelector: {
                    enabled: true,
                    selected:5
                },
                rangeSelectorZoom:'',
                title: {
                    text:"Yearly Stock Price"
                },
            }     
        }
    }
    
}
</script>