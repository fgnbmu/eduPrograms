<template>
    <div>
        <div v-if="isSearching">
            <p class="black20">По вашему запросу ничего не найдено</p>
        </div>
        <div v-else-if="filteredSpecsData.length > 0">
            <div v-for="(spec, index) in filteredSpecsData" :key="index">
                <div class="infoAboutProgram">
                    <div class="infoBlocks">
                        <div class="blockOfInfo">
                            <div class="topCharBlock">
                                <div class="nameOfProgram">{{ spec.napr_name }}</div>
                                <!-- <img style="width: 50px; position: absolute;" src="./icons/student_icon.svg"> -->
                            </div>
                            <div class="charBlock">
                                <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex;">
                                    <div class="propAndMean">
                                        <div class="grey20-500">Уровень подготовки:</div>
                                        <div class="meanOfProp">
                                            <div class="grey20-500">{{ spec.edu_level }}</div>
                                        </div>
                                    </div>
                                    <div class="propAndMean">
                                        <div class="grey20-500">Факультет:</div>
                                        <div class="meanOfProp">
                                            <div class="grey20-500">{{ spec.faculty }}</div>
                                        </div>
                                    </div>
                                    <div v-show="spec.profiles.length != 0" class="propAndMean">
                                        <div class="grey20-500">Профиль:</div>
                                        <div class="meanOfProp">
                                            <div class="grey20-500">{{ spec.profiles[0] }}</div>
                                        </div>
                                    </div>
                                    <div class="propAndMean">
                                        <div class="grey20-500">Код программы:</div>
                                        <div class="meanOfProp">
                                            <div class="grey20-500"> {{ spec.napr_code }}</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="blockOfInfo">
                            <div class="topCharBlockRow">
                                <div class="propsBlocks">
                                    <div class="grey20-500">Форма обучения</div>
                                    <div class="typeOfProps">
                                        <div class="black30-500">{{ spec.edu_form }}</div>
                                    </div>
                                </div>
                                <div class="propsBlocks">
                                    <div class="grey20-500">Срок обучения</div>
                                    <div class="typeOfProps">
                                        <div class="black30-500">{{ getLengthOfStudying(index) }}</div>
                                    </div>
                                </div>
                                <div class="propsBlocks" v-if="spec.payment && spec.payment.length">
                                    <div class="grey20-500">Стоимость в год</div>
                                    <div class="typeOfProps">
                                        <div class="black30-500">{{ spec.payment[0].first_year }} ₽</div>
                                    </div>
                                </div>
                            </div>
                            <div class="topCharBlockColumn">
                                <div class="propAndMean">
                                    <div class="grey20-500">Форма обучения: </div>
                                    <div class="meanOfProp">
                                        <div class="black20-500">{{ spec.edu_form }}</div>
                                    </div>
                                </div>
                                <div class="propAndMean">
                                    <div class="grey20-500">Срок обучения: </div>
                                    <div class="meanOfProp">
                                        <div class="black20-500">{{ getLengthOfStudying(index) }}</div>
                                    </div>
                                </div>
                                <div class="propAndMean" v-if="spec.payment && spec.payment.length">
                                    <div class="grey20-500">Стоимость в год: </div>
                                    <div class="meanOfProp">
                                        <div class="black20-500">{{ spec.payment[0].first_year }} ₽</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="charBlock">
                                <div class="finInfoRow">
                                    <div class="grey20-500">Кол-во мест:</div>
                                    <div class="meanOfProp">
                                        <template v-for="(quota, idx) in getQuotas(index)" :key="idx">
                                            <div class="black20-500">
                                                {{ quota }}
                                                <span v-if="idx !== getQuotas(index).length - 1"> / </span>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div class="finInfoColumn">
                                    <div class="grey20-500">Кол-во мест:</div>
                                    <div style="flex: 1 1 0; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex; flex-direction: column;">
                                        <template v-for="(quota, idx) in getQuotas(index)" :key="idx">
                                            <div class="black20-500">
                                                {{ quota }}
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div class="USEblock" v-if="checkIfEgeExamExists(index)">
                                    <div class="grey20-500">ЕГЭ:</div>
                                    <div style="display: flex; flex-wrap: wrap; max-width: 100%; height: fit-content; ">
                                        <template v-for="(exam, i) in getEgeExamsWithPriorityOne(index)" :key="i">
                                            <div class="black20-500">{{ exam.exam_name }}<span v-if="i < getEgeExamsWithPriorityOne(index).length - 1">/</span></div>
                                        </template>
                                        <div v-show="getEgeExamsWithPriorityOne(index).length > 0 && getEgeExamsWithPriorityOneNewRF(index).length > 0" class="black20-500">/</div>
                                        <div v-show="getEgeExamsWithPriorityOne(index).length > 0 && getEgeExamsWithPriorityOneNewRF(index).length === 0" class="black20-500">, </div>
                                        <template v-for="(exam, i) in getEgeExamsWithPriorityOneNewRF(index)" :key="i">
                                            <div class="black20-500">{{ exam.exam_name }}*<span v-if="i < getEgeExamsWithPriorityOneNewRF(index).length - 1">/</span></div>
                                        </template>
                                        <div v-show="getEgeExamsWithPriorityOneNewRF(index).length > 0" class="black20-500">, </div>
                                        <template v-for="(exam, i) in getEgeExamsWithPriorityTwo(index)" :key="i">
                                            <div class="black20-500">{{ exam.exam_name }}<span v-if="i < getEgeExamsWithPriorityTwo(index).length - 1">/</span></div>
                                        </template>
                                        <div v-show="getEgeExamsWithPriorityTwo(index).length > 0" class="black20-500">, </div>
                                        <template v-for="(exam, i) in getEgeExamsWithPriorityThree(index)" :key="i">
                                            <div class="black20-500">{{ exam.exam_name }}<span v-if="i < getEgeExamsWithPriorityThree(index).length - 1">/</span></div>
                                        </template>
                                    </div>
                                </div>
                                <div class="enterExamsBlock" v-if="checkIfEnterExamExists(index)">
                                    <div class="grey20-500">Экзамены:</div>
                                    <div style="display: flex; flex-wrap: wrap; max-width: 100%; height: fit-content; ">
                                        <!-- <div style="padding-right: 5px;" class="grey20-500">Обязательные:</div>
                                        <div v-show="getEnterExamsWithPriorityNotTwo(index).length < 1" class="black20-500">нет</div> -->
                                        <template v-for="(exam, i) in getEnterExamsWithPriorityNotTwo(index)" :key="i">
                                            <div class="black20-500">{{ exam.exam_name }}<span v-if="i < getEnterExamsWithPriorityNotTwo(index).length - 1">/</span></div>
                                        </template>
                                        <div v-show="getEnterExamsWithPriorityTwo(index).length > 0 && getEnterExamsWithPriorityNotTwo(index).length > 0" class="black20-500">, </div>
                                        <template v-for="(exam, i) in getEnterExamsWithPriorityTwo(index)" :key="i">
                                            <div class="black20-500">{{ exam.exam_name }}<span v-if="i < getEnterExamsWithPriorityTwo(index).length - 1">/</span></div>
                                        </template>
                                    </div>
                                </div>
                                <div v-show="getEgeExamsWithPriorityOneNewRF(index).length > 0" class="black20-500">* для граждан новых регионов РФ</div>
                            </div>
                        </div>
                    </div>
                    <a :href="spec.site_link" style="cursor: pointer; border: none;" class="learnMore">
                        <div class="black20-500">Узнать подробнее</div>
                        <img src="./icons/arrow_right.svg">
                    </a>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="black20">По вашему запросу ничего не найдено</p>
        </div>
    </div>
    
    
    
</template>

<script>

export default {
  data() {
    return {
        filteredSpecsData: [],
        isSearching: false
    };
  },
  props: {
        nameFilter: String,
        facultyFilter: String,
        formFilter: String,
        levelFilter: String,
        examsFilter: Array,
        originalSpecsData: Array
  },
  created() {
        this.$watch('originalSpecsData', (newValue, oldValue) => {
            if (newValue && newValue.length > 0) {
                this.filterData();
            }
        });
    },
  methods: {
    filterData() {
            this.isSearching = true;
            if (this.originalSpecsData.length) {
                if (this.nameFilter || this.facultyFilter || this.formFilter || this.levelFilter || this.examsFilter.length > 0) {
                this.filteredSpecsData = this.originalSpecsData.filter(spec => {
                    // Условия для фильтрации
                    if ((!this.nameFilter || spec.napr_name === this.nameFilter) &&
                        (!this.facultyFilter || spec.faculty === this.facultyFilter) &&
                        (!this.formFilter || spec.edu_form === this.formFilter) &&
                        (!this.levelFilter || spec.edu_level === this.levelFilter)) {

                        // Дополнительная проверка для экзаменов
                        if (this.examsFilter.length > 0) {
                            return this.examsFilter.every(selectedExam => {
                                return spec.exams.some(exam => exam.exam_name === selectedExam);
                            });
                        }

                        return true; // Если нет выбранных экзаменов, выводим все направления
                    }
                    return false;
                });
                } else {
                    this.filteredSpecsData = this.originalSpecsData;
                }
            }
            this.isSearching = false;
        },
        applyFilterData() {
            this.filterData();
        },
        clearFilterData() {
            this.filteredSpecsData = this.originalSpecsData;
        },
        checkIfEgeExamExists(idx) {
            if (this.filteredSpecsData && this.filteredSpecsData[idx] && this.filteredSpecsData[idx].exams) {
                return this.filteredSpecsData[idx].exams.some(exam => exam.exam_type === 'ЕГЭ');
            }
            return false;
        },
        getEgeExamsWithPriorityOne(idx) {
            if (this.filteredSpecsData[idx] && this.filteredSpecsData[idx].exams) {
                return this.filteredSpecsData[idx].exams.filter(exam => exam.exam_type === 'ЕГЭ' && exam.exam_priority === 1 && exam.new_citizens === 0);
            }
            return [];
        },
        getEgeExamsWithPriorityOneNewRF(idx) {
            if (this.filteredSpecsData[idx] && this.filteredSpecsData[idx].exams) {
                return this.filteredSpecsData[idx].exams.filter(exam => exam.exam_type === 'ЕГЭ' && exam.exam_priority === 1 && exam.new_citizens === 1);
            }
            return [];
        },
        getEgeExamsWithPriorityNotTwo(idx) {
            if (this.filteredSpecsData[idx] && this.filteredSpecsData[idx].exams) {
                return this.filteredSpecsData[idx].exams.filter(exam => exam.exam_type === 'ЕГЭ' && exam.exam_priority != 2);
            }
            return [];
        },
        getEgeExamsWithPriorityTwo(idx) {
            if (this.filteredSpecsData[idx] && this.filteredSpecsData[idx].exams) {
                return this.filteredSpecsData[idx].exams.filter(exam => exam.exam_type === 'ЕГЭ' && exam.exam_priority === 2);
            }
            return []
        },
        getEgeExamsWithPriorityThree(idx) {
            if (this.filteredSpecsData[idx] && this.filteredSpecsData[idx].exams) {
                return this.filteredSpecsData[idx].exams.filter(exam => exam.exam_type === 'ЕГЭ' && exam.exam_priority === 3);
            }
            return []
        },
        checkIfEnterExamExists(idx) {
            if (this.filteredSpecsData && this.filteredSpecsData[idx] && this.filteredSpecsData[idx].exams) {
                return this.filteredSpecsData[idx].exams.some(exam => exam.exam_type != 'ЕГЭ');
            }
            return false;
        },
        getEnterExamsWithPriorityNotTwo(idx) {
            if (this.filteredSpecsData[idx] && this.filteredSpecsData[idx].exams) {
                return this.filteredSpecsData[idx].exams.filter(exam => exam.exam_type != 'ЕГЭ' && exam.exam_priority != 2);
            }
            return []
        },
        getEnterExamsWithPriorityTwo(idx) {
            if (this.filteredSpecsData[idx] && this.filteredSpecsData[idx].exams) {
                return this.filteredSpecsData[idx].exams.filter(exam => exam.exam_type != 'ЕГЭ' && exam.exam_priority === 2);
            }
            return []
        },
        getLengthOfStudying(idx) {
            if (this.filteredSpecsData && this.filteredSpecsData[idx] && this.filteredSpecsData[idx].edu_length) {
                const years = this.filteredSpecsData[idx].edu_length;

                if (years > 1 && years <= 4) {
                    return `${years} года`;
                } else if (years >= 5 && years <= 10) {
                    return `${years} лет`;
                } else if (years === 1) {
                    return `${years} год`;
                }
            }
            return '-';
        },
        getQuotas(idx) {
            if(this.filteredSpecsData && this.filteredSpecsData[idx] && this.filteredSpecsData[idx].quotas) {
                const filteredQuotas = this.filteredSpecsData[idx].quotas.filter(quota => quota.includes('бюджет') || quota.includes('договор'));
                
                return filteredQuotas.reverse();
            }
            return [];
        }
  },
};
</script>