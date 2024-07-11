<template>
    <div class="burgerSearch">
        <div style="border-top: none;" class="searchLine" v-on:click="openBurger" v-on:dblclick="closeBurger">
            <input v-if="selectedProgramIndex !== null" v-model="searchQuery" placeholder="Введите название программы..." class="black20" style="border: none; outline: none; background: transparent; width: 100%;" @click="selectedProgramIndex = null">
            <input v-else v-model="searchQuery" placeholder="Введите название программы..." class="black20" style="border: none; outline: none; background: transparent; width: 100%;" @input="filterPrograms">
        </div>
        <div style="display: inline-flex; flex-direction: column; width: 100%; max-height: 179.2px; overflow-y: scroll;">
            <div v-for="(item, index) in filteredPrograms" v-show="isOpened" :key="index" class="searchLine" @click="selectItem(index)">
                <div class="grey20">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        programNames: Array
    },
    data() {
        return {
            isOpened: false,
            searchQuery: '',
            selectedProgramIndex: null
        };
    },
    mounted() {
        // this.fetchData();
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
            this.$emit('select-program', this.filteredPrograms[index]);
            this.selectedProgramIndex = this.programNames.indexOf(this.filteredPrograms[index]);
            this.searchQuery = this.filteredPrograms[index];
            this.isOpened = false;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpened = false;
            }
        },
        filterPrograms() {
            this.selectedProgramIndex = null;
            let query = this.searchQuery.toLowerCase();
            // Фильтрация программ по введенному запросу
            // Этот код остается таким же, как в предыдущих примерах
        },
        clearFilter() {
            this.searchQuery = '';
        }
    },
    computed: {
        filteredPrograms() {
            let query = this.searchQuery.toLowerCase();
            let filteredNames = new Set(); // Создаем Set для хранения уникальных значений

            if (Array.isArray(this.programNames)) {
                this.programNames.forEach(name => {
                    if (name.toLowerCase().includes(query)) {
                        filteredNames.add(name);
                    }
                });
            }

            return Array.from(filteredNames); // Преобразуем Set обратно в массив для отображения
        },
    },

};
</script>

