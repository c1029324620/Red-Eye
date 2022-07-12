<template>
<div>
    <p v-if="emptyPosition">You don't have any Portfolio right now...</p>
    <h1> My Portfolio</h1>
    <div v-show="!emptyPosition" class = "card wrap">
        <dl v-for="(item, index) in positionList" :key="index" class="card-box">
        <div class="card-header">
            <h4> {{ positionList[index].ticker }} </h4>
        </div>
        <div class="card-body">
        <h5 class="card-title">{{ positionList[index].name }}</h5>
        <dt>Quantity: {{positionList[index].quantity}}</dt>
        <dt>Cost: {{positionList[index].totalCost}}</dt>    
        <dt>Avg Cost: {{positionList[index].avgCost}}</dt>    
        </div>
            <div class="card-footer text-muted" style="text-align:center;">
                <button type="button" class="btn btn-primary" style="margin:10px;" data-toggle="modal" data-target="#buyModal" @click="buy(positionList[index].ticker)">Buy</button> 
                <button type="button" class="btn btn-primary" style="margin:10px;background:red;border:red;" data-toggle="modal" data-target="#sellModal" @click="sell(positionList[index].ticker)">Sell</button>
                <div class="modal fade" id="buyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <span style="color:black;font-size:20px">Buy {{this.ticker}}</span>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="sellModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <span style="color:black;font-size:20px">Sell {{this.ticker}}</span>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dl>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            positionList:[],
            emptyPosition: true,
            ticker:""
        }
    },
    methods: {
        getList() {
            this.positionList = [];
            var j = 0;
            for(var i = 0; i < localStorage.length; i++) {
                var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if(data.quantity != undefined) {
                    this.positionList[j] = data;
                    j++;
                }
            }
            if(j !== 0) {
                this.emptyPosition = false;
            }
            console.log(this.positionList);
        },
        buy(s) {
            this.ticker = s;
        },
        sell(s) {
            this.ticker = s;
        }
    },
    mounted() {
        this.getList();
    }
}
</script>
<style>
</style>