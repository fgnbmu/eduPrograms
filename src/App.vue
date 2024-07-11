<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import EduLevel from './components/EduLevel.vue'
import PrepLevel from './components/PrepLevel.vue'
import Faculty from './components/Faculty.vue'
import FormOfLearning from './components/FormOfLearning.vue'
import Exams from './components/Exams.vue'
import EduProgram from './components/EduProgram.vue'
import SearchLine from './components/SearchLine.vue'
</script>



<script>

import axios from 'axios';

export default {
    data() {
        return {
            isSearched: false,
            nameFilter: '',
            facultyFilter: '',
            formFilter: '',
            levelFilter: '',
            examsFilter: [],
            items: [],
            faculties: [],
            facultyNames: [],
            edu_levels: [],
            levelsNames: [],
            edu_forms: [],
            formNames: [],
            exams: [],
            examNames: [],

            itemsSpecs: [],
            specs: [],
            programNames: [],
            originalSpecsData: []

            // isSelectedFac: []
        };
    },
    components: {
        SearchLine,
        Faculty,
        FormOfLearning,
        PrepLevel,
        Exams,
        EduProgram
    },
    mounted() {
        this.fetchData();
        this.fetchData2();
    },
    methods: {
        handleSelectProgram(selectedProgram) {
            this.nameFilter = selectedProgram;
            // console.log(this.nameFilter);
        },
        handleSelectFaculty(selectedFaculty) {
            // console.log('Выбранный факультет:', selectedFaculty);
            this.facultyFilter = selectedFaculty;
        },
        handleSelectForm(selectedForm) {
            this.formFilter = selectedForm;
        },
        handleSelectLevel(selectedLevel) {
            this.levelFilter = selectedLevel;
        },
        handleSelectExams(selectedExam) {
            this.examsFilter.push(selectedExam);
            console.log(this.examsFilter);
        },
        handleDeselectExam(deselectedExam) {
            const index = this.examsFilter.indexOf(deselectedExam);
            if (index !== -1) {
                this.examsFilter.splice(index, 1);
            }
        },
        handleSearch() {
            this.$refs.eduProgram.applyFilterData();
        },
        handleClear() {
            this.nameFilter = '';
            this.facultyFilter = '';
            this.formFilter = '';
            this.levelFilter = '';
            this.examsFilter = [];
            this.$refs.eduProgram.clearFilterData();
            this.$refs.faculty.clearFilter();
            this.$refs.facultyCol.clearFilter();
            this.$refs.level.clearFilter();
            this.$refs.levelCol.clearFilter();
            this.$refs.form.clearFilter();
            this.$refs.formCol.clearFilter();
            this.$refs.name.clearFilter();
            this.$refs.nameCol.clearFilter();
            this.$refs.exams.clearFilter();
            this.$refs.examsCol.clearFilter();
        },
        fetchData() {
            axios.get(`https://abiturient.psu.ru/ords_eol_etis/api/abit/dictionaries/`)
                .then(response => {
                    this.items = response.data;
                    this.faculties = this.items.data.faculties;
                    this.facultyNames = this.faculties.map(faculty => faculty.name);
                    this.edu_levels = this.items.data.edu_levels;
                    this.levelsNames = this.edu_levels.map(edu_level => edu_level.name);
                    this.edu_forms = this.items.data.edu_forms;
                    this.formNames = this.edu_forms.map(edu_form => edu_form.name);
                    this.exams = this.items.data.exams;
                    this.examNames = this.exams.map(exam => exam.exam_name);
                })
                .catch(error => {
                    console.error('Ошибка получения данных', error);
                });
        },
        fetchData2() {
            axios.get(`https://abiturient.psu.ru/ords_eol_etis/api/abit/specs/`)
                .then(response => {
                    this.itemsSpecs = response.data;
                    this.specs = this.itemsSpecs.data.specs;
                    this.programNames = this.specs.map(spec => spec.napr_name);
                    this.originalSpecsData = response.data.data.specs;
                })
                .catch(error => {
                    console.error('Ошибка получения данных', error);
                });
        },
    }
};
</script>

<template>
    <div class="main">
        <div class="header">
            <div class="top">
                <img class="logoSize" src="./assets/logo1.svg" />
                <div class="infoInHeader">
                    <a href="mailto:info@psu.ru">
                        <img class="mailSize" src="./assets/mail_icon.svg" alt="Email Icon">
                    </a>
                    <div class="phoneInHeader">
                        <div class="phoneNumber">+7 (342) 2-396-589</div>
                        <div class="phoneTimes">пн-пт 09:00 - 18:00</div>
                    </div>
                </div>
            </div>
            <div class="redLine"></div>
        </div>
        <div class="page">
            <div class="props">
                <div class="headerInPage">
                    <div class="headerInPageFont">Образовательные программы</div>
                </div>
                <div class="lineInProps">
                    <div class="propSearchLine">
                        <SearchLine ref="name" :programNames="programNames" @select-program="handleSelectProgram"></SearchLine>
                    </div>
                </div>
                
                <div class="lineInProps">
                    <!-- <div class="propEduLevel">
                        <div class="nameOfProp">Уровень образования:</div>
                        <EduLevel></EduLevel>
                    </div> -->
                    <div class="propFaculty">
                        <div class="nameOfProp">Факультет:</div>
                        <Faculty ref="faculty" :facultyNames="facultyNames" @faculty-selected="handleSelectFaculty"></Faculty>
                    </div>
                    <div class="propPrepLevel">
                        <div class="nameOfProp">Уровень подготовки:</div>
                        <PrepLevel ref="level" :levelsNames="levelsNames" @level-selected="handleSelectLevel"></PrepLevel>
                    </div>
                </div>
                <div class="lineInProps">
                    <!-- <div class="propFaculty">
                        <div class="nameOfProp">Факультет:</div>
                        <Faculty></Faculty>
                    </div> -->
                    <Exams ref="exams" :examNames="examNames" @exams-selected="handleSelectExams" @exams-deselected="handleDeselectExam"></Exams>
                    <div class="propEduForm">
                        <div class="nameOfProp">Форма обучения:</div>
                        <FormOfLearning ref="form" :formNames="formNames" @form-selected="handleSelectForm"></FormOfLearning>
                    </div>
                </div>
                <!-- <div class="lineInProps">
                    <Exams></Exams>
                </div> -->
                <!-- <div class="lineInPropsColumn">
                    <div class="propEduLevelInColumn">
                        <div class="nameOfProp">Уровень образования:</div>
                        <EduLevel></EduLevel>
                    </div>
                </div> -->
                <div style="padding-top: 0px; padding-bottom: 0px;" class="lineInPropsColumn">
                    <div class="propSearchLine">
                        <SearchLine ref="nameCol" :programNames="programNames" @select-program="handleSelectProgram"></SearchLine>
                    </div>
                </div>
                <div class="lineInPropsColumn">
                    <div class="propPrepLevelInColumn">
                        <div class="nameOfProp">Уровень подготовки:</div>
                        <PrepLevel ref="levelCol" :levelsNames="levelsNames" @level-selected="handleSelectLevel"></PrepLevel>
                    </div>
                </div>
                <div class="lineInPropsColumn">
                    <div class="propFacultyInColumn">
                        <div class="nameOfProp">Факультет:</div>
                        <Faculty ref="facultyCol" :facultyNames="facultyNames" @faculty-selected="handleSelectFaculty"></Faculty>
                    </div>
                </div>
                <div class="lineInPropsColumn">
                    <div class="propEduFormInColumn">
                        <div class="nameOfProp">Форма обучения:</div>
                        <FormOfLearning ref="formCol" :formNames="formNames" @form-selected="handleSelectForm"></FormOfLearning>
                    </div>
                </div>
                <div class="lineInPropsColumn">
                    <Exams ref="examsCol" :examNames="examNames" @exams-selected="handleSelectExams" @exams-deselected="handleDeselectExam"></Exams>
                </div>
                <div v-show="examsFilter.length > 0" class="space"></div>
                <div class="lineInPropsButtons">
                    <div class="clearButton" @click="handleClear">
                        <div class="black20">Очистить фильтры</div>
                    </div>
                    <div class="clearButtonMini" @click="handleClear">
                        <div class="black20">Очистить</div>
                    </div>
                    <div class="searchButton" @click="handleSearch">
                        <div class="white20">Найти</div>
                    </div>
                </div>
            </div>
            <div class="infoAboutPrograms">
                <EduProgram ref="eduProgram" :originalSpecsData="originalSpecsData" :nameFilter="nameFilter" :facultyFilter="facultyFilter" :formFilter="formFilter" :levelFilter="levelFilter" :examsFilter="examsFilter"></EduProgram>
            </div>
        </div>
    </div>
  
</template>
