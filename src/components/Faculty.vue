<template>
    <div class="burger">
        <div style="border-top: none;" class="burgerLineFaculty" @click="openBurger" @dblclick="closeBurger">
            <div v-show="selectedFaculty === ''" class="red20" @click="selectItem(index)">Все</div>
            <div class="red20" @click="selectItem(index)">{{ selectedFaculty }}</div>
            <div v-show="!isOpened" class="arrowInBurger">
                <img src="./icons/arrow_down.svg">
            </div>
            <div v-show="isOpened" class="arrowInBurger">
                <img src="./icons/arrow_up.svg">
            </div>
        </div>
        <div style="display: inline-flex; flex-direction: column; width: 100%; max-height: 179.2px; overflow-y: scroll;">
            <div v-for="(item, index) in facultyNames" v-show="isOpened" :key="'closeWith' + index" class="burgerLineFaculty" @click="selectItem(index)">
                <div class="red20">{{ facultyNames[index] }}</div>
            </div>
        </div>
        <!-- <div class="selectedFacultyDisplay">Выбранный факультет: {{ selectedFaculty }}</div> -->
    </div>
</template>

<script>
export default {
    props: {
        facultyNames: Array
    },
    data() {
        return {
            isOpened: false,
            selectedFaculty: ''
        };
    },
    mounted() {
        // if (this.facultyNames) {
        //     this.selectedFaculty = this.facultyNames[0] || '';  // Выбрать первый элемент по умолчанию
        // }
        document.addEventListener('mousedown', this.handleClickOutside);
        // this.$emit('clear-filters', this.clearFilters);
    },
    beforeDestroy() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        // this.$emit('clear-filters', this.clearFilters);
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
            this.selectedFaculty = this.facultyNames[index];
            this.$emit('faculty-selected', this.selectedFaculty);
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpened = false;
            }
        },
        clearFilter() {
            this.selectedFaculty = '';
        }
    }
};
</script>