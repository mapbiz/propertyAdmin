import {Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { setNotificationClose } from "../../slices/notificationSlice.jsx";

import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

export default function NotificationCreateObject({ isSuccess = true }) {
    const dispatch = useDispatch();

    const notificationOpen = useSelector(state => state.notification.value.createObject)

    const actionNotification = (
        <>
            <IconButton
                size="small"
                color="primary"
                onClick={ () => dispatch(setNotificationClose({ notificationName: 'createObject'}))}
            >
                <CloseIcon size="small" color="primary" />
            </IconButton>
        </>
    )

    return (
        <Snackbar
            open={notificationOpen}
            autoHideDuration={3000}
            onClose={() => dispatch(setNotificationClose({ notificationName: 'createObject'}))}
            action={actionNotification}
            message={isSuccess ? 'Обьект успешно создан': 'Ошибка при создании обьекта'}
        />
    );
};