import {useSelector, useDispatch} from "react-redux";

import {joinNewTentant, setTentantData, removeTentant} from "../../slices/createObjectSlice";
import {
    FormControl,
    InputLabel,
    Menu,
    MenuItem,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";

export default function ObjectTentant({}) {
    const createdObjectTentants = useSelector(state => state.createObject),
        tentants = useSelector(state => state.tentants.value);

    const dispatch = useDispatch();

    const [joinedTentant, setJoinedTentant] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleMenuClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
            setAnchorEl(null);
        },
        handleCloseItem = tentant => {
            console.log({tentant});

            dispatch(joinNewTentant({
                tentant,
            }));
            setJoinedTentant(before => [...before, tentant.id]);

            return handleClose();
        };
    return (
        <>
            {
                createdObjectTentants.createdObject?.tenantsInfo.length > 0 &&

                createdObjectTentants.createdObject?.tenantsInfo?.map(tentantInObject => {
                    return (
                        <>
                            <Card sx={{display: 'flex', flexDirection: 'column'}}>
                                <CardMedia
                                    image={`https://prop-test.ru/server/public/${tentantInObject.tentant.logo}`}
                                    sx={{height: 250, width: 250}}
                                />
                                <CardContent>
                                    <Button
                                        color="error"
                                        onClick={() => {
                                            dispatch(removeTentant(tentantInObject.tentant.id))
                                        }}
                                    >
                                        Удалить арендатора
                                    </Button>
                                    <div className="flex flex-col">
                                        <div>
                                            <Typography variant="h5"> {tentantInObject.tentant.name} </Typography>
                                            <Typography variant="body">{tentantInObject.tentant.category}</Typography>
                                        </div>

                                        <div className="flex gap-4">
                                            <TextField
                                                label="Индексация"
                                                type="number"
                                                defaultValue={tentantInObject.indexation}
                                                onChange={e => {
                                                    dispatch(setTentantData({
                                                        field: 'indexation',
                                                        value: +e.target.value,
                                                        tentantId: tentantInObject.tentant.id,
                                                    }))
                                                }}
                                            />
                                            <TextField
                                                label="Детализация"
                                                defaultValue={tentantInObject.detalization.join(",")}
                                                onChange={e => {
                                                    dispatch(setTentantData({
                                                        field: 'detalization',
                                                        value: e.target.value.split(","),
                                                        tentantId: tentantInObject.tentant.id,
                                                    }));
                                                }}
                                            />
                                            <TextField
                                                label="Договор"
                                                defaultValue={tentantInObject.contract}
                                                onChange={e => {
                                                    dispatch(setTentantData({
                                                        field: 'contract',
                                                        value: e.target.value,
                                                        tentantId: tentantInObject.tentant.id,
                                                    }))
                                                }}
                                            />
                                            <TextField
                                                label="Месячный арендный поток"
                                                type="number"
                                                defaultValue={tentantInObject.rentFlow.month}
                                                onChange={e => {
                                                    dispatch(setTentantData({
                                                        field: 'rentFlow.month',
                                                        value: +e.target.value,
                                                        tentantId: tentantInObject.tentant.id,
                                                    }));
                                                }}
                                            />
                                            <TextField
                                                label="Годовой арендный поток"
                                                type="number"
                                                defaultValue={tentantInObject.rentFlow.year}
                                                onChange={e => {
                                                    dispatch(setTentantData({
                                                        field: 'rentFlow.year',
                                                        value: +e.target.value,
                                                        tentantId: tentantInObject.tentant.id,
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )
                })
            }
            <Button
                id="menu"
                onClick={handleMenuClick}
            > Арендодатор </Button>
            <Menu
                id="tentant-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'menu',
                }}
            >
                {
                    tentants?.length > 0 &&
                    tentants.map(tentant => {
                        return (
                            <>
                                {
                                    joinedTentant.findIndex(joinTentantId => joinTentantId === tentant.id) === -1 &&
                                    <MenuItem
                                        key={tentant.id}
                                        sx={{display: joinedTentant.findIndex(joinTentantId => joinTentantId === tentant.id) === -1 ? 'block' : 'none'}}
                                        value={tentant.id}
                                        onClick={() => handleCloseItem(tentant)}
                                    >
                                        {tentant.name}
                                    </MenuItem>
                                }
                            </>
                        );
                    })
                }
            </Menu>
            {/* <FormControl fullWidth>
               <InputLabel id="select-label">Выберите арендатора</InputLabel>
               <Select
                  labelId="select-label"
                  label="Выберите арендатора"
                  value={tenant}
                  onChange={handleSelectChange}
               >
                  {
                     tentants.map(tentant => {
                        return (
                           <>
                              { 
                                 <MenuItem 
                                    key={tentant.id}
                                    sx={{display: joinedTentant.findIndex(joinTentantId => joinTentantId === tentant.id) === -1 ? 'block': 'none'}}
                                    value={tentant.id}
                                 >
                                    {tentant.name}
                                 </MenuItem>
                              }
                           </>
                        );
                     })
                  }
               </Select>
            </FormControl> */}
        </>
    );
};