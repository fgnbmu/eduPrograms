<template>
    <div class="burger">
        <div style="border-top: none;" class="burgerLinePrepLevel" @click="openBurger" @dblclick="closeBurger">
            <div v-show="selectedLevel === ''" class="red20" @click="selectItem(index)">Все</div>
            <div class="red20" @click="selectItem(index)">{{ selectedLevel }}</div>
            <div v-show="!isOpened" class="arrowInBurger">
                <img src="./icons/arrow_down.svg">
            </div>
            <div v-show="isOpened" class="arrowInBurger">
                <img src="./icons/arrow_up.svg">
            </div>
        </div>
        <div v-for="(item, index) in levelsNames" v-show="isOpened" :key="'closeWith' + index" class="burgerLinePrepLevel" @click="selectItem(index)">
            <div class="red20">{{ levelsNames[index] }}</div>
        </div>
        <!-- <div class="selectedLevelDisplay">Выбранный факультет: {{ selectedLevel }}</div> -->
    </div>
</template>

<script>
export default {
    props: {
        levelsNames: Array
    },
    data() {
        return {
            isOpened: false,
            selectedLevel: ''
        };
    },
    mounted() {
        // if (this.levelsNames) {
        //     this.selectedLevel = this.levelsNames[0] || '';  // Выбрать первый элемент по умолчанию
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
            this.selectedLevel = this.levelsNames[index];
            this.$emit('level-selected', this.selectedLevel);
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpened = false;
            }
        },
        clearFilter() {
            this.selectedLevel = '';
        }
    }
};
</script>