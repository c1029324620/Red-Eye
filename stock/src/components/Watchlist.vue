<template>
    <p v-if="emptyList">You don't have anything in your watchlist so far</p>
    <div class="card">
        <div class="card-body">
            <dl v-for="(item, index) in listItems" :key="index" class="card-box" @click="toDetail(listItems[index].ticker)">
                <h5 class="card-title">{{ listItems[index].ticker}} {{listItems[index].last}} 
                    <span class="glyphicon glyphicon-remove" id="remove" @click.stop="removeList(listItems[index].name)">
                        </span></h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    {{listItems[index].name}} {{listItems[index].points}} {{listItems[index].percent}} 
                </h6>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            emptyList:false,
            listItems:[]
        }
    },
    methods: {
        isEmpty() {
            if(localStorage.length == 0)
                this.emptyList = true;
        },
        getList() {
            this.listItems = [];
            var j = 0;
            for(var i = 0; i < localStorage.length; i++) {
                var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if(data.quantity == undefined) {
                    this.listItems[j] = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    j++;
                }
            }
            if(j === 0) {
                this.emptyList = true;
            }
            console.log(this.listItems.length);
            this.listItems = this.sortList.apply(this,this.listItems);
            //console.log(this.listItems);
        },

        removeList(s) {
            console.log(s);
            localStorage.removeItem(s);
            this.getList();
        },
        
        sortList() {
            for(var i=0; i < arguments.length; i++) {
                for(var j=0; j < arguments.length - i - 1; j++)
                {
                    if(arguments[j].ticker > arguments[j + 1].ticker)
                    {
                        var temp = arguments[j];
                        arguments[j] = arguments[j+1];
                        arguments[j+1] = temp;
                    }
                }
            }
            return arguments;
        },

        toDetail(s) {
            this.$router.push({
                name:'details', params: { id:s}})
            }
    },
    mounted() {
        this.isEmpty();
        this.getList();
    }
}
</script>

<style>
.card-box {
    border: 2px solid green;
}
#remove:hover{
    cursor: pointer;
}
</style>