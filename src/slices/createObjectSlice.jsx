import deepObject from 'object-path';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createCard, deleteCard } from '../api/api';
import { objectToFormData } from '../helpers/formData';

import { objectFilterEmpty } from '../helpers/object.js';
import useCopyFile from '../helpers/useCopyFile.js';

export const typesObject = {
  rent: 'Аренда',
  sale: 'Продажа',
  'sale-business': 'ГАБ',
};
export const stagesObject = {
  beforeInput: 'beforeInput',
  pickedType: 'pickedType',
  input: 'input',
  beforeValidate: 'beforeValidate',
  validate: 'validate',
  error: 'error',
  beforeCreate: 'beforeCreate',
  created: 'created',
  createdSaleBusiness: 'createdSaleBusiness',
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
    priceSaleGlobal: '',
    priceSaleSquare: '',

    // panorama
    panorama: '',

    // images
    photos: [],
    photosLayout: [],
    tentantLogo: '',
    // photoMap: '',

    // coordinates
    lat: '',
    lon: '',

    // global rent flow
    globalRentFlowYear: '',
    globalRentFlowMouth: '',

    isNew: false,
    isNewPrice: false,
  },
  fields: {
    title: {
      input: 'text',
      name: 'Заголовок',
      required: true,
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
      name: 'Зона погрузки/разгрузки',
    },
    address: {
      input: 'text',
      name: 'Адрес',
      required: true,
    },
    metro: {
      input: 'text',
      name: 'Метро',
    },
    payback: {
      input: 'number',
      name: 'Окупаемость в годах',
      required: true,
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
      name: 'Высота потолков',
    },
    infoEnter: {
      input: 'text',
      name: 'Вход',
    },
    infoForce: {
      input: 'number',
      name: 'Эл. мощность',
    },
    infoFinishing: {
      input: 'text',
      name: 'Отделка',
    },
    infoHood: {
      input: 'checkbox',
      name: 'Вытяжка',
    },
    infoFloor: {
      input: 'number',
      name: 'Этажи',
    },

    isNew: {
      input: 'checkbox',
      name: 'Новый обьект',
    },
    isNewPrice: {
      input: 'checkbox',
      name: 'Новая цена',
    },

    // price
    priceSquare: {
      input: 'number',
      name: 'Цена/Арендная ставка за м2',
      required: true,
    },
    priceProfitability: {
      input: 'number',
      name: 'Доходность в % годовых',
      required: true,
    },
    priceGlobal: {
      input: 'number',
      name: 'Цена/Арендная плата',
      required: true,
    },
    priceRentYear: {
      input: 'number',
      name: 'Арендная ставка в год',
      required: true,
    },
    priceSaleGlobal: {
      input: 'number',
      name: 'Сниженная цена',
    },
    priceSaleSquare: {
      input: 'number',
      name: 'Сниженная цена м2',
    },
    // priceSale: {
    //    input: 'number',
    //    name: 'Сниженная цена'
    // },
    // priceRentMouth: {
    //    input: 'number',
    //    name: 'Арендная ставка в мес',
    //    required: true,
    // },

    // panorama
    panorama: {
      input: 'text',
      name: 'Ссылка на панораму',
    },

    // images
    photos: {
      input: 'files',
      name: 'Фотографии объекта',
      required: true,
    },
    photosLayout: {
      input: 'files',
      name: 'Фотографии планировки',
      required: true,
    },
    tentantLogo: {
      input: 'file',
      name: 'Логотип арендатора',
    },

    // coordinates
    lat: {
      input: 'number',
      name: 'Широта',
      required: true,
    },
    lon: {
      input: 'number',
      name: 'Долгота',
      required: true,
    },

    // global rent flow
    globalRentFlowYear: {
      input: 'number',
      name: 'Общий арендный поток в год',
      required: true,
    },
    globalRentFlowMouth: {
      input: 'number',
      name: 'месячный арендный поток',
      required: true,
    },
  },
  createdObject: null,
  type: null,
  stage: 'beforeInput',
  isLoading: null,
};

export const createObject = createAsyncThunk(
  'create/object',
  async (objectData, { rejectWithValue }) => {
    try {
      const copyPhotos = useCopyFile({ files: objectData.photos }),
        copyPhotosLayout = useCopyFile({ files: objectData.photosLayout });

      const readyObjectData = objectToFormData(objectFilterEmpty(objectData));

      let copyTentantLogo;

      if (!!objectData.tentantLogo) {
        copyTentantLogo = useCopyFile({ files: [objectData.tentantLogo] })
          .copiedFiles[0];
        readyObjectData.set('tentantLogo', copyTentantLogo);
      }

      readyObjectData.delete('photos');
      objectData.type === 'rent'
        ? readyObjectData.set('priceRentMouth', objectData.priceSquare)
        : null;
      readyObjectData.delete('photosLayout');

      Array.from(copyPhotos.files).forEach(photoFile => {
        readyObjectData.append('photos', photoFile);
      });
      Array.from(copyPhotosLayout.files).forEach(photoLayoutFile => {
        readyObjectData.append('photosLayout', photoLayoutFile);
      });

      const responceCreateObject = await createCard(readyObjectData);

      if (responceCreateObject.status !== 201) return responceCreateObject;

      return responceCreateObject.data;
    } catch (err) {
      // console.log(err)
      return rejectWithValue(err);
    }
  },
);
export const deleteCreatedObject = createAsyncThunk(
  'delete/created/object',
  async createdObjectId => {
    const responceDelete = await deleteCard(createdObjectId);

    return;
  },
);

export const createObjectSlice = createSlice({
  name: 'createObject',
  initialState,
  reducers: {
    resetCreateObject: state => {
      state = initialState;
    },

    /**
     * @param {{ payload: { stage: 'beforeInput' | 'error' | 'input' | 'validate' | 'pickedType' | 'beforeCreate' | 'created' | 'createdSaleBusiness' } }} action
     */
    pickObjectStage: (state, action) => {
      const { stage } = action.payload;

      const newObject = JSON.parse(JSON.stringify(state));

      if (!stagesObject[stage])
        console.error(`${stage} не существует такого этапа создания обьекта!`);
      else newObject.stage = stage;

      state = newObject;
    },

    /**
     *
     * @param {{ payload: { type: 'rent' | 'sale' | 'sale-business' } }} action
     */
    pickObjectType: (state, action) => {
      const { type } = action.payload;

      let newObject = JSON.parse(JSON.stringify(initialState));

      switch (type) {
        case 'rent':
          newObject.fields.priceGlobal.name = 'Арендная плата';
          newObject.fields.priceSquare.name = 'Арендная плата за м2';

          delete newObject.value.payback;
          delete newObject.value.priceProfitability;
          delete newObject.value.globalRentFlowYear;
          delete newObject.value.globalRentFlowMouth;
          break;

        case 'sale':
          newObject.fields.priceGlobal.name = 'Цена';
          newObject.fields.priceSquare.name = 'Цена за м2';

          delete newObject.value.payback;
          delete newObject.value.priceProfitability;
          delete newObject.value.globalRentFlowYear;
          delete newObject.value.globalRentFlowMouth;
          delete newObject.value.priceRentMouth;
          delete newObject.value.priceRentYear;
          break;
        case 'sale-business':
          newObject.fields.priceGlobal.name = 'Цена';
          newObject.fields.priceSquare.name = 'Цена за м2';

          delete newObject.value.priceRentMouth;
          delete newObject.value.priceRentYear;
          break;
      }

      newObject.type = type;
      newObject.stage = stagesObject.pickedType;

      return (state = newObject);
    },

    /**
     *
     * @param {{ payload: { field: string, value: any } }} action
     */
    changeObjectField: (state, action) => {
      const { field, value } = action.payload;

      if (!field) return;
      // if(value.toString().length === 0) return;

      // state.stage = stagesObject.input;
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

    /**
     * @param {{ payload: { errors: string[], field: string } }} action
     */
    setErrorsOnField: (state, action) => {
      const { errors, field } = action.payload;

      state.fields[field].error = errors.join(', ');
      state.stage = stagesObject.error;
    },
    /**
     * @param {{ payload: { field: string } }} action
     */
    clearErrorsOnField(state, action) {
      const { field } = action.payload;

      Reflect.deleteProperty(state.fields[field], 'error');

      const newObject = JSON.parse(JSON.stringify(state));

      const getRequiredFields = Object.keys(newObject.value)
        .map(objectField => {
          if (!!newObject.fields[objectField]?.required)
            return {
              fieldName: objectField,
              field: newObject.fields[objectField],
              value: newObject.value[objectField],
            };
        })
        .filter(field => !!field);

      const errorsFields = getRequiredFields.filter(
        objectField => !!objectField.field?.error,
      );

      newObject.stage =
        errorsFields.length === 0
          ? stagesObject.beforeCreate
          : stagesObject.error;

      state = newObject;
      state.stage =
        errorsFields.length === 0
          ? stagesObject.beforeCreate
          : stagesObject.error;
    },

    validateFieldsObject: state => {
      const newObject = JSON.parse(JSON.stringify(state));

      state.stage = stagesObject.beforeValidate;

      let requiredFields = Object.keys(newObject.value)
        .map(objectField => {
          if (!!newObject.fields[objectField]?.required)
            return {
              fieldName: objectField,
              fieldInfo: newObject.fields[objectField],
              value: newObject.value[objectField],
            };
        })
        .filter(field => !!field);

      requiredFields = requiredFields.map(requiredField => {
        if (requiredField.value.toString().length === 0)
          return {
            ...requiredField,
            fieldInfo: {
              ...requiredField.fieldInfo,
              error: 'Поле обязательно для заполнения',
            },
          };
        return requiredField;
      });

      const errorRequiredFields = requiredFields.filter(
        objectField => !!objectField.fieldInfo?.error,
      );

      if (errorRequiredFields.length > 0) {
        newObject.stage = stagesObject.error;

        errorRequiredFields.forEach(errRequiredField => {
          newObject.fields[errRequiredField.fieldName] = {
            ...errRequiredField.fieldInfo,
          };
        });
      } else newObject.stage = stagesObject.validate;

      return (state = newObject);
    },
    removeTentant: (state, action) => {
      state.createdObject.tenantsInfo.splice(
        state.createdObject.tenantsInfo.findIndex(
          tentantInObject => tentantInObject.tentant.id === action.payload,
        ),
        1,
      );
    },
    // tentant
    /**
     * @param { { payload: { tentant: object } } } action
     */
    joinNewTentant: (state, action) => {
      if (state.createdObject === null) return;

      state.createdObject.tenantsInfo.push({
        type: 'create',
        tentant: action.payload.tentant,
        detalization: [''],
        indexation: null,
        contract: '',
        rentFlow: {
          mount: null,
          year: null,
        },
      });
    },
    /**
     * @param {{ payload: { field: string, value: unkown, tentantId: string } }} action
     */
    setTentantData: (state, action) => {
      const { field, value, tentantId } = action.payload;

      const findTentantInObject = state.createdObject.tenantsInfo.findIndex(
        tentantInObject => tentantInObject.tentant.id === tentantId,
      );

      if (findTentantInObject === -1)
        console.error('Ошибка такого арендатора нет!');
      else {
        deepObject.set(
          state.createdObject.tenantsInfo[findTentantInObject],
          field,
          value,
        );
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(createObject.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(createObject.rejected, (state, action) => {
      state.isLoading = false;

      state.error = {
        response: action.payload.response,
      };
    });
    builder.addCase(createObject.fulfilled, (state, action) => {
      if (state.type === 'sale-business') {
        state.stage = stagesObject.createdSaleBusiness;
        state.createdObject = action.payload.data;
      } else {
        state.stage = stagesObject.created;
      }

      state.error = undefined;

      state.isLoading = false;
    });

    builder.addCase(deleteCreatedObject.fulfilled, (state, action) => {
      state.createdObject = null;
    });
  },
});

export const {
  pickObjectType,
  pickObjectStage,
  resetCreateObject,

  // object field
  changeObjectField,
  resetObjectField,

  // error field
  setErrorsOnField,
  clearErrorsOnField,
  validateFieldsObject,

  // tentants
  joinNewTentant,
  setTentantData,
  removeTentant,
} = createObjectSlice.actions;

export default createObjectSlice.reducer;
