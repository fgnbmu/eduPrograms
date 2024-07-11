<template>
    <div class="burger">
        <div style="border-top: none;" class="burgerLineFormOfLearning" @click="openBurger" @dblclick="closeBurger">
            <div v-show="selectedForm === ''" class="red20" @click="selectItem(index)">Все</div>
            <div class="red20" @click="selectItem(index)">{{ selectedForm }}</div>
            <div v-show="!isOpened" class="arrowInBurger">
                <img src="./icons/arrow_down.svg">
            </div>
            <div v-show="isOpened" class="arrowInBurger">
                <img src="./icons/arrow_up.svg">
            </div>
        </div>
        <div v-for="(item, index) in formNames" v-show="isOpened" :key="'closeWith' + index" class="burgerLineFormOfLearning" @click="selectItem(index)">
            <div class="red20">{{ formNames[index] }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        formNames: Array
    },
    data() {
        return {
            isOpened: false,
            selectedForm: ''
        }
    },
    mounted() {
        // if (this.formNames) {
        //     this.selectedForm = this.formNames[0] || '';  // Выбрать первый элемент по умолчанию
        // }
        document.addEventListener('mousedown', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    },
    methods: {
        openBurger() {
            this.isOpened = true;
        },
        closeBurger() {
            this.isOpened = false;
        },
        selectItem(index) {
            this.isOpened = false;
            this.selectedForm = this.formNames[index];
            this.$emit('form-selected', this.selectedForm);
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpened = false;
            }
        },
        clearFilter() {
            this.selectedForm = '';
        }
    }
};
</script>