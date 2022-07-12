<template>
    <div>
        <input type="checkbox" id="todo-item" :checked="isDone" />
        <label for="todo-item">{{ labels }}</label>
    </div>
</template>

<script>
export default {
    props: {
        labels: { type: String, required: true },
        done: { default: false, type: Boolean }
    },
    data() {
        return {
            isDone: this.done
        }
    }
};
</script>

