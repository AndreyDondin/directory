<template>
  <main class="main">
    <h1 class="main__title">Справочник компаний</h1>
    <div class="main__container">
      <input
        class="main__input"
        type="text"
        placeholder="Поиск по ФИО..."
        @input.prevent="filterCompany($event, page)"
      />
      <button class="main__button" @click.prevent="openModal">Добавить</button>
    </div>
    <CompanyTable :filterList="filterListCompany" />
    <div class="main__pagination">
      <button
        class="main__pagination-btn"
        @click.prevent="prevPage"
        :disabled="page === 1"
      >
        &lArr;
      </button>
      <span class="main__pagination-text">Страница {{ page }}</span>
      <button
        class="main__pagination-btn"
        @click.prevent="nextPage"
        :disabled="btnDisabled"
      >
        &rArr;
      </button>
    </div>
    <ModalWindow v-model:open="modalIsOpen" />
  </main>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue';
import CompanyTable from '@/components/CompanyTable.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import useFilter from '@/hooks/useFilter';
import { useStore } from 'vuex';
export default defineComponent({
  components: { CompanyTable, ModalWindow },
  setup() {
    const store = useStore();
    const modalIsOpen = ref(false);
    const page = ref(1);
    const btnDisabled = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const {
      filterCompany,
      filterListCompany,
      companyList,
      getCompanyListPage,
    } = useFilter();
    const nextPage = () => {
      page.value += 1;
    };
    const prevPage = () => {
      page.value -= 1;
    };
    watchEffect(() => {
      companyList.value = store.getters.getCompanyList;
      btnDisabled.value = page.value >= Math.ceil(companyList.value.length / 5);
      getCompanyListPage(page.value);
    });
    return {
      modalIsOpen,
      openModal,
      filterCompany,
      filterListCompany,
      nextPage,
      prevPage,
      page,
      btnDisabled,
    };
  },
});
</script>

<style lang="scss">
.main {
  &__title {
    margin-bottom: 30px;
    text-align: center;
  }
  &__container {
    display: flex;
    margin-bottom: 100px;
    justify-content: space-between;
  }
  &__input {
    padding: 15px;
    min-width: 300px;
    border: 1px solid #2c3e50;
    border-radius: 5px;
  }
  &__button {
    padding: 8px 16px;
    font-size: 20px;
    color: #fff;
    background: #036b32;
    border: none;
    border-radius: 5px;
  }
  &__pagination {
    display: flex;
    padding-top: 20px;
    justify-content: end;
    align-items: center;
  }
  &__pagination-btn {
    font-size: 30px;
    background: transparent;
    border: none;
    &:disabled {
      cursor: not-allowed;
    }
  }
  &__pagination-text {
    display: block;
    margin: 0 20px;
    font-size: 24px;
  }
}
</style>
