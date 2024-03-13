import ArendatorItem from "./ArendatorItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchArendators, fetchArendatorsFailure, fetchArendatorsSuccess} from "../slices/arendatorsSlice.jsx";
import {getArendators} from "../api/api.js";
import {useEffect} from "react";


export const getArendatorsRedux = () => async (dispatch) => {
    try {
        dispatch(fetchArendators());
        const landlords = await getArendators().then(r => {
            return r.data
        });
        dispatch(fetchArendatorsSuccess(landlords));
    } catch (error) {
        dispatch(fetchArendatorsFailure(error.message));
    }
};
export default function ArendatorsList() {
    const dispatch = useDispatch();
    const {arendators} = useSelector(state => state.arendators)



    useEffect(() => {
        dispatch(getArendatorsRedux())
    },[dispatch])

    return (
        <main className={'pt-[150px] flex-1'}>
            {arendators.map(item => {
                return (
                    <ArendatorItem name={item.name} object={item.object} category={item.category} id={item.id} logo={item.logo} key={item.id} />
                )
            })}

        </main>
    )
}