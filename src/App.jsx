
import './App.css'
import Card from "./components/Card.jsx";
import ModalWindow from "./components/ModalWindow.jsx";

function App() {



  return (
    <div className={''}>
      <div className={'h-full pt-[120px] max-w-[1280px] mx-auto w-full relative flex flex-col gap-[20px]'}>
        <Card title={'дом'} price={'123123'} img={'vite.svg'} adress={'Moscow, chexova, 20A'}/>
        <Card title={'дом'} price={'123123'} img={'vite.svg'} adress={'Moscow, chexova, 20A'}/>
        <Card title={'дом'} price={'123123'} img={'vite.svg'} adress={'Moscow, chexova, 20A'}/>
        <Card title={'дом'} price={'123123'} img={'vite.svg'} adress={'Moscow, chexova, 20A'}/>
        <Card title={'дом'} price={'123123'} img={'vite.svg'} adress={'Moscow, chexova, 20A'}/>
      </div>
      <ModalWindow />
    </div>
  )
}

export default App
