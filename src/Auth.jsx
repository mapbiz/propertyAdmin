import { useEffect, useState } from "react";
import { authMe, authUser } from "./api/api.js";
import Button from "./components/Button.jsx";
import { Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Auth() {

  const [login, setLogin] = useState(""),
  [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const onClick = async () => {
    if(login.toString().length === 0 || password.toString().length === 0) return setError("Вы не ввели пароль или логин!")

    const auth = await authUser(login, password);

    if(auth.status !== 200) return setError(auth.data.error.message);

    return navigate("/");
  };

  useEffect(() => {
    const handleCheckAuth = async () => {
      try {
        const me = await authMe();

        if(me.status === 200) return navigate('/');

      } 
      catch(err) {
        return;
      };
    };

    handleCheckAuth()
  }, []);

  return (
    <form onSubmit={async (e) => {
      e.preventDefault()
      await onClick()
    }} className={'w-full h-screen flex flex-col items-center justify-center'}>
      <div className={'w-[400px] h-[290px] py-[44px] px-[16px] flex flex-col gap-4 rounded-3xl  mb-[100px] shadow-2xl'}>
        <div className={'w-full flex flex-col gap-[25px] pb-[10px]'}>
          <input placeholder={'login'} className={'w-full border-2 h-[50px] rounded-[15px] px-[10px]'} type="text" onChange={e => setLogin(e.target.value)} />
          <input placeholder={'password'} className={'w-ful border-2 h-[50px] rounded-[15px] px-[10px]'} type="password" onChange={e => setPassword(e.target.value)}/>
        </div>

        <Button
            type={'submit'}
          text={'Авторизоваться'}
        />
      </div>

      {
        error.length > 0 &&
        <Typography
          color="error"
        >{error}</Typography>
      }

    </form>
  )
}