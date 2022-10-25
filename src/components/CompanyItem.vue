<template>
  <tr class="main__table-tr-row">
    <td class="main__table-td">{{ company.name }}</td>
    <td class="main__table-td">{{ company.owner }}</td>
    <td class="main__table-td">{{ company.phone }}</td>
    <td class="main__table-td">
      <button class="btn" @click.prevent="deleteCompany">
        <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <g id="cross">
            <line class="cls" x1="3" x2="7" y1="3" y2="7" />
            <line class="cls" x1="3" x2="7" y1="7" y2="3" />
          </g>
        </svg>
      </button>
    </td>
  </tr>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: ['company'],
  setup(props) {
    const store = useStore();
    const deleteCompany = () => {
      store.dispatch('deleteCompany', props.company.id);
    };

    return { deleteCompany };
  },
});
</script>

<style lang="scss" scoped>
td,
th {
  border: 1px solid #2c3e50;
}

.cls {
  fill: none;
  stroke: #000;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.btn {
  width: 30px;
  height: 30px;
  padding: 0;
  background: transparent;
  border: none;
}

.main__table-td {
  padding: 5px;

  &:last-child {
    text-align: center;
  }
}
</style>
