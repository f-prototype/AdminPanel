import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  selectedOrganizator: {
    country:0,
    date:'',
    gender:'',
    image:'',
    password:'',
    tel:'',
    _id:''
  },
  data: {
    event:'',
    date:'',
    days:0,
    city:'',
  }
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // Редьюсеры в слайсах меняют состояние и ничего не возвращают
  reducers: {
    selectData: (state, action) => {
      state.data = {...action.payload}
    },
    selectOrgatizator: (state,action) => {
      state.selectedOrganizator ={...action.payload}
    }
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { selectData, selectOrgatizator } = counterSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default counterSlice.reducer;