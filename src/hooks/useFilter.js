import { ref } from 'vue';
import { useStore } from 'vuex';

export default function useFilter() {
  const store = useStore();
  let companyList = ref(store.getters.getCompanyList);
  let filterListCompany = ref(null);

  const sort = (prop, dir) => {
    if (!filterListCompany.value) {
      return !dir
        ? companyList.value.sort((a, b) => (a[prop] > b[prop] ? -1 : 1))
        : companyList.value.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
    return !dir
      ? filterListCompany.value.sort((a, b) => (a[prop] > b[prop] ? -1 : 1))
      : filterListCompany.value.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
  };

  const filterCompany = (event, page) => {
    const offset = (page - 1) * 5;
    const value = event.target.value.toLowerCase();
    filterListCompany.value = [];

    filterListCompany.value = companyList.value
      .filter((obj) => obj.owner.includes(value))
      .slice(offset, offset + 5);
  };
  const getCompanyListPage = (page) => {
    const offset = (page - 1) * 5;
    filterListCompany.value = companyList.value.slice(offset, offset + 5);
  };

  return {
    sort,
    filterCompany,
    filterListCompany,
    companyList,
    getCompanyListPage,
  };
}
