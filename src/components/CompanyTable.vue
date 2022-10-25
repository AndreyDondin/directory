<template>
  <table class="main__table">
    <thead class="main__table-thead">
      <tr class="main__table-tr-row">
        <th class="main__table-th" @click.prevent="sortName">
          Название
          <span class="main__table-th-icon" :class="{ 'icon-rotate': dir }"
            >&darr;</span
          >
        </th>
        <th class="main__table-th" @click.prevent="sortOwner">
          ФИО Директора
          <span class="main__table-th-icon" :class="{ 'icon-rotate': otherDir }"
            >&darr;</span
          >
        </th>
        <th class="main__table-th">Номер телефона</th>
        <th class="main__table-th"></th>
      </tr>
    </thead>
    <tbody class="main__table-body">
      <CompanyItem
        :company="company"
        v-for="company in filterList"
        :key="company.id"
      />
    </tbody>
  </table>
  <h2 class="main__title" v-if="companyList.length === 0">
    Список компаний пуст
  </h2>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import CompanyItem from '@/components/CompanyItem.vue';
import { useStore } from 'vuex';
import useFilter from '@/hooks/useFilter';
export default defineComponent({
  components: { CompanyItem },
  props: ['filterList'],
  setup(props) {
    const store = useStore();
    const nameIcon = ref(null);
    const ownerIcon = ref(null);
    const dir = ref(false);
    const otherDir = ref(dir.value);
    const { sort } = useFilter();
    const companyList = computed(() =>
      props.filterList.value
        ? store.getters.getCompanyList.filter((item) =>
            item.owner.includes(...props.filterList)
          )
        : store.getters.getCompanyList
    );
    const sortName = () => {
      if (!dir.value) {
        sort('name', dir.value);
        dir.value = !dir.value;
      } else {
        sort('name', dir.value);
        dir.value = !dir.value;
      }
    };
    const sortOwner = () => {
      if (!otherDir.value) {
        sort('owner', otherDir.value);
        otherDir.value = !otherDir.value;
      } else {
        sort('owner', otherDir.value);
        otherDir.value = !otherDir.value;
      }
    };
    return {
      companyList,
      sortName,
      sortOwner,
      nameIcon,
      ownerIcon,
      sort,
      dir,
      otherDir,
    };
  },
});
</script>

<style lang="scss" scoped>
table,
td,
th {
  border: 1px solid #2c3e50;
}
table {
  width: 100%;
  border-collapse: collapse;
}
.icon-rotate {
  display: inline-block;
  transform: rotate(180deg);
}
.main {
  &__title {
    margin: 15px;
    text-align: center;
    color: #bd022a;
  }
  &__table-thead {
    background-color: #b8b4b4;
  }
  &__table-th {
    padding: 20px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
