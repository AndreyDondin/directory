import { createStore } from 'vuex';

export default createStore({
  state: {
    companyList: [
      { id: 0, name: 'ООО Ромашка', owner: 'петя', phone: '+79206533935' },
      { id: 1, name: 'ООО Бедняшка', owner: 'вася', phone: '+79206533935' },
      { id: 2, name: 'ООО Арес', owner: 'толя', phone: '+79206533935' },
      { id: 3, name: 'ООО Бастион', owner: 'сережа', phone: '+79206533935' },
      { id: 4, name: 'ООО Альбион', owner: 'саша', phone: '+79206533935' },
      { id: 6, name: 'ООО Лучший дом', owner: 'маша', phone: '+79206533935' },
      { id: 7, name: 'ООО Лучший дом', owner: 'маша', phone: '+79206533935' },
      { id: 8, name: 'ООО Лучший дом', owner: 'маша', phone: '+79206533935' },
      { id: 9, name: 'ООО Лучший дом', owner: 'маша', phone: '+79206533935' },
      { id: 10, name: 'ООО Лучший дом', owner: 'маша', phone: '+79206533935' },
      { id: 11, name: 'ООО Лучший дом', owner: 'маша', phone: '+79206533935' },
      { id: 12, name: 'ООО Лучший дом', owner: 'маша', phone: '+79206533935' },
      { id: 13, name: 'ООО Лучший дом', owner: 'маша', phone: '+79206533935' },
      { id: 14, name: 'ООО Лучший дом', owner: 'маша', phone: '+79206533935' },
    ],
  },
  getters: {
    getCompanyList(state) {
      return state.companyList;
    },
  },
  mutations: {
    updateCompanyList(state, companyList) {
      state.companyList = companyList;
    },
  },
  actions: {
    addCompany(context, company) {
      const list = context.state.companyList;
      list.push(company);
      context.commit('updateCompanyList', list);
    },
    deleteCompany(context, id) {
      const list = context.state.companyList.filter((item) => item.id !== id);
      context.commit('updateCompanyList', list);
    },
  },
  modules: {},
});
