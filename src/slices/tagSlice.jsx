import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: {
        images: [
            '',
            '',
            ''
        ],
        id: '',
        title: '',
        price: {
            square: null,
            profitability: null,
            global: null,
            rent: {
                year: null,
                mouth: null
            }
        },
        square: '',
        windowType: '',
        cellingHeight: '',
        finishing: '',
        priceM: '',
        address: '',
        coordinates: {
            lat: '',
            lon: '',
        },
        description: '',
        addressM: '',
        layout: '',
        entrance: '',
        elPower: '',
        // hood: '',
        totalCost: '',
        tenant: '',
        profitability: '',
        monthlyRentalFlow: '',
        annualRentalFlow: '',
        leaseTerm: '',
        panorama: '',
        arendators: [],
        createdAt: '',
        updatedAt: '',
        type: '',
        slug: '',
        info: {
            square: null,
            floor: null,
            ceilingHeight: null,
            countEntrance: null,
            glazing: null,
            typeWindow: '',
            layout: '',
            enter: '',
            finishing: '',
            hood: '',
            force: ''
        },
        metro: '',
        tenantsInfo: [
            {
                detalization: [
                    ''
                ],
                indexation: null,
                contract: '',
                rentFlow: {
                    mount: null,
                    year: null
                },
                tentant: {
                    id: '',
                    name: '',
                    category: '',
                    logo: ''
                }
            }
        ],
        globalRentFlow: {
            year: null,
            mouth: null
        },
        payback: null,
        zone: null,
        layoutImages: [
            '',
            '',
            ''
        ]
    },
}

export const tagSlice = createSlice({
    name: 'tagMore',
    initialState,
    reducers: {
        resetObject: (state) => {
            return initialState
        },
        addNewTentant: state => {
            state.value.tenantsInfo.push({
                isCreated: false,
                detalization: [
                    ''
                ],
                indexation: null,
                contract: '',
                rentFlow: {
                    mount: null,
                    year: null
                },
                tentant: {
                    id: '',
                    name: '',
                    category: '',
                    logo: ''
                }
            })
        },
        setTentantData: (state, action) => {
            state.value.tenantsInfo[action.payload.id] = {
                ...action.payload.data,
            };

        },
        deleteTenant: (state, action) => {
            state.value.tenantsInfo.splice(state.value.tenantsInfo.findIndex(tentantInObject => tentantInObject.tentant.id === action.payload), 1);
        },
        joinTentant: (state, action) => {
            state.value.tenantsInfo.push({
                type: "create",
                tentant: action.payload.tentant,
                detalization: [
                    ''
                ],
                indexation: null,
                contract: '',
                rentFlow: {
                    mount: null,
                    year: null
                },
            });
        },

        setArendators: (state, action) => {
            return {
                ...state,
                value: {
                    ...state.value,
                    arendators: action.payload.arendators,
                },
            };
        },
        addLayoutImage: (state, action) => {
            state.value.layoutImages.push(action.payload);
        },
        addCardImage: (state, action) => {
            state.value.images.push(action.payload);
        },
        removeLayoutImage: (state, action) => {
            state.value.layoutImages.splice(action.payload, 1);
        },
        removeCardImage: (state, action) => {
            state.value.images.splice(action.payload, 1);
        },
        setObject: (state, action) => {
            const newPayload = {
                ...action.payload,
            };

            console.log(newPayload)
            if(newPayload.tenantsInfo && newPayload.tenantsInfo.length > 0) {
                newPayload.tenantsInfo = newPayload.tenantsInfo.filter(tentantInObject => {
                    return !!tentantInObject?.tentant
                }).map(tentant => {
                    return {
                        type: 'update',
                        ...tentant,
                    };
                })
            }


            state.value = { ...state.value, ...newPayload }
        },
        openCurrentObject: (state, action) => {
            state.value = action.payload
        },
        updateTenantContractById(state, action) {
            const {tenantId, newContract} = action.payload;
            const tenantIndex = state.value.tenantsInfo.findIndex(tenantInfo => tenantInfo.tentant.id === tenantId);
            if (tenantIndex !== -1) { // Проверяем, найден ли элемент
                state.value.tenantsInfo[tenantIndex].contract = newContract;
            }
        },
        updateTenantRentFlowM(state, action) {
            const {tenantId, newRentFlowM} = action.payload;
            const tenantIndex = state.value.tenantsInfo.findIndex(tenantInfo => tenantInfo.tentant.id === tenantId);
            if (tenantIndex !== -1) {
                state.value.tenantsInfo[tenantIndex].rentFlow.mount = newRentFlowM;
            }
        },
        updateTenantRentFlowY(state, action) {
            const {tenantId, newRentFlowY} = action.payload;
            const tenantIndex = state.value.tenantsInfo.findIndex(tenantInfo => tenantInfo.tentant.id === tenantId);
            if (tenantIndex !== -1) {
                state.value.tenantsInfo[tenantIndex].rentFlow.year = newRentFlowY;
            }
        },
        updateTenantIndex(state, action) {
            const {tenantId, newIndex} = action.payload;
            const tenantIndex = state.value.tenantsInfo.findIndex(tenantInfo => tenantInfo.tentant.id === tenantId);
            if (tenantIndex !== -1) {
                state.value.tenantsInfo[tenantIndex].indexation = newIndex;
            }
        },
        updateTenantDetalization(state, action) {
            const {tenantId, newText} = action.payload;
            const tenantIndex = state.value.tenantsInfo.findIndex(tenantInfo => tenantInfo.tentant.id === tenantId);
            if (tenantIndex !== -1) {
                state.value.tenantsInfo[tenantIndex].detalization = newText.split('\\');
            }
        },
        updateRent(state, action) {
            const {type, value} = action.payload
            state.value.price.rent[type] = value
        },
        updateCheckBox(state, action) {
            const {type, value} = action.payload
            state.value.info[type] = value
        }

    },
})

// Action creators are generated for each case reducer function
export const {
    setObject,
    addCardImage,
    removeCardImage,
    resetObject,
    setArendators,
    openCurrentObject,
    addLayoutImage,
    removeLayoutImage,
    updateTenantContractById,
    updateTenantRentFlowM,
    updateTenantRentFlowY,
    updateTenantIndex,
    updateTenantDetalization,
    updateRent,
    updateCheckBox,
    addNewTentant,
    joinTentant,
    deleteTenant,
    setTentantData,
} = tagSlice.actions

export default tagSlice.reducer
