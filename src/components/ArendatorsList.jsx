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


    console.log(arendators)

    useEffect(() => {
        dispatch(getArendatorsRedux())
    },[dispatch])

    return (
        <div className={'pt-[150px]'}>
            {arendators.map(item => {
                return (
                    <ArendatorItem name={item.name} object={item.object} category={item.category} id={item.id} logo={item.logo} key={item.id} />
                )
            })}

        </div>
    )
}