import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createCard } from "../api/api";
import { objectToFormData } from "../helpers/formData";

export const typesObject = {
   rent: "Аренда",
   sale: "Продажа",
   'sale-business': "ГАБ",
};

const initialState = {
   value: {
      title: '',
      description: '',
      agentRemuneration: '',
      zone: false,
      address: '',
      metro: '',
      payback: '',

      // info
      infoSquare: '',
      infoTypeWindow: '',
      infoLayout: '',
      infoCeilingHeight: '',
      infoEnter: '',
      infoFloor: '',
      infoForce: '',
      infoFinishing: '',
      infoHood: false,

      // price
      priceSquare: '',
      priceProfitability: '',
      priceGlobal: '',
      priceRentYear: '',
      priceRentMouth: '',

      // panorama
      panorama: '',

      // images
      photos: [],
      photosLayout: [],
      photoMap: '',

      // coordinates
      lat: '',
      lon: '',

      // global rent flow
      globalRentFlowYear: '',
      globalRentFlowMouth: '',
   },
   fields: {
      title: {
         input: "text",
         name: "Заголовок",
      },
      description: {
         input: 'textarea',
         name: 'Описание',
      },
      agentRemuneration: {
         input: 'number',
         name: 'Вознаграждение агента',
      },
      zone: {
         input: 'checkbox',
         name: 'Зона погрузки/разгрузки'
      },
      address: {
         input: 'text',
         name: 'Адрес'
      },
      metro: {
         input: 'text',
         name: 'Метро'
      }, 
      payback: {
         input: 'number',
         name: 'Окупаемость'
      },

      // info
      infoSquare: {
         input: 'number',
         name: 'Площадь (информация об обьекте)',
      },
      infoTypeWindow: {
         input: 'text',
         name: 'Тип окон',
      },
      infoLayout: {
         input: 'text',
         name: 'Планировка',
      },
      infoCeilingHeight: {
         input: 'text',
         name: 'Высота потолков'
      },
      infoEnter: {
         input: 'text',
         name: 'Вход'
      },
      infoForce: {
         input: 'number', 
         name: 'Эл. мощность'
      },
      infoFinishing: {
         input: 'text',
         name: 'Отделка'
      },
      infoHood: {
         input: 'checkbox',
         name: 'Вытяжка'
      },
      infoFloor: {
         input: 'number',
         name: 'Этажи'
      },

      // price
      priceSquare: {
         input: 'number',
         name: 'Цена/Аренданая ставка за м2'
      },
      priceProfitability: {
         input: 'number',
         name: 'Окупаемость в годах'
      },
      priceGlobal: {
         input: 'number',
         name: 'Цена/Арендная плата'
      },
      priceRentYear: {
        input: 'number',
        name: 'Арендная ставка в мес' 
      },
      priceRentMouth: {
         input: 'number',
         name: 'Арендная ставка в год'
      },

      // panorama
      panorama: {
         input: 'text',
         name: 'Ссылка на панораму'
      },

      // images
      photos: {
         input: 'files',
         name: 'Фотки обьекта'
      },
      photosLayout: {
         input: 'files',
         name: 'Фотки планировки'
      },
      photoMap: {
         input: 'file',
         name: 'Фотка карты (для формирования пдф)'
      },
      
      // coordinates
      lat: {
         input: 'number',
         name: 'Широта'
      },
      lon: {
         input: 'number',
         name: 'Долгота' 
      },

      // global rent flow
      globalRentFlowYear: {
         input: 'number',
         name: "Общий арендный поток в год"
      },
      globalRentFlowMouth: {
         input: 'number',
         name: 'Общий месячный арендный поток в год'
      },
   },
   type: null,
   stage: 'simple',
   isLoading: false,
}; 

export const createObject = createAsyncThunk(
   'create/object',
   async objectData => {
      const responceCreateObject = await createCard(objectToFormData(objectData));

      return responceCreateObject.data;
   },
)

export const createObjectSlice = createSlice({
   name: 'createObject',
   initialState,
   reducers: {
      resetCreateObject: state => {
         state = initialState;
      },
      
      /**
       * 
       * @param {{ payload: { type: 'rent' | 'sale' | 'sale-business' } }} action 
       */
      pickObjectType: (state, action) => {
         const { type } = action.payload;

         let newObject = JSON.parse(JSON.stringify(initialState));

         switch(type) {
            case "rent":
               delete newObject.value.payback;
               delete newObject.value.priceProfitability;
               delete newObject.value.globalRentFlowYear;
               delete newObject.value.globalRentFlowMouth;
            break;
            
            case "sale":
               delete newObject.value.payback;
               delete newObject.value.priceProfitability;
               delete newObject.value.globalRentFlowYear;
               delete newObject.value.globalRentFlowMouth;
               delete newObject.value.priceRentMouth;
               delete newObject.value.priceRentYear;
            break;
            case "sale-business":
               delete newObject.value.priceRentMouth;
               delete newObject.value.priceRentYear;
            break;
         }

         newObject.type = type;
         
         return state = newObject;
      },

      /**
       * 
       * @param {{ payload: { field: string, value: any } }} action 
       */
      changeObjectField: (state, action) => {
         const {
            field,
            value,
         } = action.payload;

         
         if(!field) return;
         if(value === '' && value === ' ') return;


         state.value[field] = value;
      },
      /**
       * 
       * @param {{ payload: { field: string } }} action 
       */
      resetObjectField: (state, action) => {
         const { field } = action.payload;

         delete state.value[field];
      }, 
   },
   extraReducers: builder => {
      builder.addCase(createObject.pending, state => {
         state.isLoading = true;
      })
      builder.addCase(createObject.fulfilled, (state, action) => {

         if(state.type === 'sale-business') state.stage = 'create-sale-bussiness';

         state.isLoading = false;
      });
   }
});

export const {
   pickObjectType,
   resetCreateObject,

   changeObjectField,
   resetObjectField,
} = createObjectSlice.actions;

export default createObjectSlice.reducer;