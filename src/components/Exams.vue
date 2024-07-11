<template>
    <div class="propExams">
        <div class="examsInner">
            <div class="nameOfProp">ЕГЭ:</div>
            <div class="burger">
                <div style="border-top: none;" class="burgerLineExams" v-on:click="openBurger" v-on:dblclick="closeBurger">
                    <div class="red20">Выбрать</div>
                    <div v-show="!isOpened" class="arrowInBurger">
                        <img src="./icons/arrow_down.svg">
                    </div>
                    <div v-show="isOpened" class="arrowInBurger">
                        <img src="./icons/arrow_up.svg">
                    </div>
                </div>
                <div style="display: inline-flex; flex-direction: column; width: 100%; max-height: 179.2px; overflow-y: scroll;">
                    <div v-for="(item, index) in examNames" :key="index" class="burgerLineExams" v-show="isOpened" @click="closeWith(index + 1)">
                        <div class="red20">{{ examNames[index] }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="exams">
            <div v-for="(isShow, index) in isShows" :key="index" v-show="isShow" class="examsNames">
                <div class="white20">{{ items[index].name }}</div>
                <img src="./icons/reset.svg" @click="toggleIsShow(index)">
            </div>
        </div> -->



        <div class="examsInColumn">
            <div v-for="(isShow, index) in isShows" :key="index" v-show="isShow" class="examsNames">
                <div class="white20">{{ examNames[index] }}</div>
                <img src="./icons/reset.svg" @click="resetExam(index)">
            </div>
        </div>

        <!-- <div style="height: 200px; padding-top: px;">
          <div v-for="(isShow, index) in isShows" :key="index" v-show="isShow" class="examsNames">
                <div class="white20">{{ examNames[index] }}</div>
                <img src="./icons/reset.svg" @click="resetExam(index)">
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    examNames: Array
  },
  data() {
    return {
      isOpened: false,
      isShows: [],
      selectedExams: []
    };
  },
  mounted() {
    if (this.examNames.length) {
      this.isShows = Array(this.examNames.length).fill(false);
    }
    document.addEventListener("mousedown", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  },
  methods: {
    openBurger() {
      this.isOpened = true;
    },
    closeBurger() {
      this.isOpened = false;
    },
    closeWith(index) {
      this.isOpened = false;
      this.isShows[index - 1] = true;
      this.$emit("exams-selected", this.examNames[index-1]);
    },
    resetExam(index) {
      this.isShows[index] = false;
      this.$emit("exams-deselected", this.examNames[index]);
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpened = false;
      }
    },
    clearFilter() {
      this.isShows = Array(this.isShows.length).fill(false);
    }
  }
};
</script>

<style>

</style> 