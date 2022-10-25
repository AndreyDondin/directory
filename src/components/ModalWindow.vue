<template>
  <Teleport v-if="open" to="#teleport">
    <div class="modal" ref="modal" @click.stop="doClose">
      <div class="modal__container" @click.stop>
        <h3 class="modal__title">Добавить организацию</h3>
        <form class="modal__form" @submit.prevent="addCompany">
          <input
            v-model.trim="formData.name"
            type="text"
            class="modal__input"
            placeholder="Введите название"
          />
          <input
            v-model.trim="formData.phone"
            type="tel"
            class="modal__input"
            placeholder="Введите номер телефона"
          />
          <input
            v-model.trim="formData.owner"
            type="text"
            class="modal__input"
            placeholder="Введите ФИО владельца"
          />
          <div class="modal__btn-group">
            <button class="modal__btn" @click.prevent="doClose" type="button">
              Отмена
            </button>
            <button
              class="modal__btn"
              type="submit"
              :disabled="
                formData.name === '' ||
                formData.phone === '' ||
                formData.owner === ''
              "
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: ['open'],
  emits: ['update:open', 'update:page'],
  setup(props, { emit }) {
    const store = useStore();
    const modal = ref(null);

    let formData = reactive({
      id: Date.now(),
      name: '',
      phone: '',
      owner: '',
    });
    const zeroingFormData = () => {
      formData.name = '';
      formData.phone = '';
      formData.owner = '';
    };

    const doClose = () => {
      emit('update:open', false);
      zeroingFormData();
    };

    const addCompany = () => {
      store.dispatch('addCompany', { ...formData });
      zeroingFormData();
      doClose();
    };

    return {
      modal,
      doClose,
      formData,
      addCompany,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;

  &__container {
    padding: 40px;

    max-width: 400px;
    background-color: #a2e8e1;
    border-radius: 15px;
  }
  &__title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 30px;
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
  &__input {
    margin-bottom: 15px;
    padding: 10px;
  }
  &__btn-group {
    display: flex;
    justify-content: space-between;
  }
  &__btn {
    padding: 8px 16px;
    color: #fff;
    font-size: 16px;
    background: #2c3e50;
    border: none;
    border-radius: 10px;

    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
