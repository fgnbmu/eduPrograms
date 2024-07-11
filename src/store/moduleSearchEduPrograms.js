import api from "../api/api"

export const moduleSearchEduPrograms = {
    state: () => ({
        edu_forms: [],
        prep_levels: [],
        edu_levels: [],
        faculties: [],
        edu_programs: {
            items: [],
            page: 1,
            pages: NaN
        },

        loading_get_edu_programs_by_filter: false,
    }),
    getters: {
        existEduPrograms: state => {
            return state.edu_programs.items?.length !== 0
        },
        eduPrograms: state => {
            return state.edu_programs
        },
        eduForms: state => {
            return state.edu_forms
        },
        faculties: state => {
            return state.faculties
        },
        prepLevels: state => {
            return state.prep_levels
        },
        eduLevels: state => {
            return state.edu_levels
        },
        loadingGetEduProgramsByFilter: state => {
            return state.loading_get_edu_programs_by_filter
        },
        currentPageOfEduPrograms: state => {
            return state.edu_programs.page
        },
    }, 
    mutations: {
        setEduForms (state, data) {
            state.edu_forms = data
        },

        setFaculties (state, data) {
            state.faculties = data
        },

        setPrepLevels (state, data) {
            state.prep_levels = data
        },

        setEduLevels (state, data) {
            state.edu_levels = data
        },

        setEduPrograms (state, data) {
            state.edu_programs = data
        },
        
        clearFaculties (state) {
            state.faculties = []
        },
        setLoadingGetEduProgramsByFilter (state, data) {
            state.loading_get_edu_programs_by_filter = data
        },
        setCurrentPageOfEduPrograms (state, data) {
            state.edu_programs.page = data
        },
    },
    actions: {
        getAllEduForms ({ commit }) {
            api.getAllEduForms(data => {
                commit('setEduForms', data.data)
            })
        },

        getAllPrepLevels ({ commit }) {
            api.getAllPrepLevels(data => {
                commit('setPrepLevels', data.data)
            })
        },

        getAllEduLevels ({ commit }) {
            api.getAllEduLevels(data => {
                commit('setEduLevels', data.data)
            })
        },

        getFaculties ({ commit }) {
            api.getFaculties(data => {
                commit('setFaculties', data.data)
            })
        },

        getEduPrograms ({ commit }, {filters}) {
            api.getEduPrograms(filters, (data) => {
                // console.log(data)
                commit('setEduPrograms', data);
                commit('setLoadingGetEduProgramsByFilter', false);
            }, () => commit('setLoadingGetEduProgramsByFilter', false))
        },
    }
}