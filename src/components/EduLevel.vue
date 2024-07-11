<template>
    <div class="burger">
        <div style="border-top: none;" class="burgerLineEduLevel" v-on:click="openBurger" v-on:dblclick="closeBurger">
            <div v-for="(item, index) in items" :key="index" v-show="isSelected[index]" class="red20" @click="selectItem(index)">{{ item.name }}</div>
            <div v-show="!isOpened" class="arrowInBurger">
                <img src="./icons/arrow_down.svg">
            </div>
            <div v-show="isOpened" class="arrowInBurger">
                <img src="./icons/arrow_up.svg">
            </div>
        </div>
        <div v-for="(item, index) in items" v-show="isOpened" :key="'closeWith' + index" class="burgerLine" @click="closeWith(index)">
            <div class="red20">{{ item.name }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            isOpened: false,
            isSelected: [false, false, false, true],
            items: []
        }
    },
    mounted() {
        document.addEventListener('mousedown', this.handleClickOutside);
        // Загружаем данные из JSON при монтировании компонента
        this.fetchData();
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
            this.isSelected = this.isSelected.map((_, i) => i === index);
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpened = false;
            }
        },
        closeWith(index) {
            this.isOpened = false;
            this.isSelected = this.isSelected.map((_, i) => i === index);
        },
        async fetchData() {
            try {
                const response = await axios.get(`eduLevels.json`);
                this.items = response.data;
            } catch (error) {
                console.error('Ошибка получения данных', error);
            }
        }
    }
};
</script>