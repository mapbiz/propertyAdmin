import {Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { setNotificationClose, setNotificationOpen } from "../../slices/notificationSlice.jsx";

import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";

export default function NotificationCreateObject({ isSuccess = true }) {
    const dispatch = useDispatch();

    const notificationOpen = useSelector(state => state.notification.value.createObject),
    createObject = useSelector(state => state.createObject);

    const actionNotification = (
        <>
            <IconButton
                size="small"
                color="primary"
                onClick={() => dispatch(setNotificationClose({ notificationName: 'createObject'}))}
            >
                <CloseIcon size="small" color="primary" />
            </IconButton>
        </>
    )

    useEffect(() => {
        if(createObject.stage === 'created') dispatch(setNotificationOpen({ notificationName: 'createObject' }));
    }, [createObject]); 

    return (
        <Snackbar
            open={notificationOpen}
            autoHideDuration={3000}
            onClose={() => {
                console.log('close')
                dispatch(setNotificationClose({notificationName: 'createObject'}))
            }}
            action={actionNotification}
            message={isSuccess ? 'Обьект успешно создан': 'Ошибка при создании обьекта'}
        />
    );
};