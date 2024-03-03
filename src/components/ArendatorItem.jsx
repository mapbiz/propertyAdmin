import {useEffect} from "react";
import Button from "@mui/material/Button";


export default function ArendatorItem({key, logo, id, object, category, name}) {
    useEffect(() => {

    }, [])

    return (
        <div className={'flex justify-between max-w-[1280px]'}>
            <img src={logo} alt=""/>
            <p>
                {name}
            </p>
            <div className={'flex gap-2'}>
                <Button variant={"contained"}>
                    Редактировать
                </Button>
                <Button variant={"contained"} color={"error"}>
                    Удалить
                </Button>
            </div>
        </div>
    )
}