import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import { swapElements } from '../../helpers/array';

export default function ImageSwitcher({ 
    imgs = [],
    setImgs = newImgs => {},
    onNext = () => {},
    onPrevious = () => {}, 
}) {
    const handleNext =  i => {
        let swappedImages = [...imgs];

        swappedImages = swapElements(swappedImages, i, i+1 >= imgs.length ? 0: i+1);

        setImgs(swappedImages);

        return onNext();
    },
    handlePrevious = i => {
        let swappedImages = [...imgs];

        if(i === 0) swappedImages = swapElements(swappedImages, i, imgs.length-1);
        else swappedImages = swapElements(swappedImages, i, i-1);

        setImgs(swappedImages);

        return onPrevious(); 
    };

    const handleDelete = i => {
        let clonedImages = [...imgs];

        clonedImages.splice(i, 1);

        setImgs(clonedImages);

        return;
    };

    return (
        <>
            {
                imgs.length > 0 &&
                <div className='flex gap-2'>
                    {
                        imgs.map((img, i) => {
                            return (
                                <div
                                    key={i}
                                    className="relative group"
                                >
                                    <div className="absolute top-[50%] translate-y-[-50%] w-full flex justify-between">
                                        <IconButton
                                            color="success"  
                                            onClick={() => handlePrevious(i)}
                                        >
                                            <KeyboardArrowLeftIcon />
                                        </IconButton>
                                        <IconButton
                                            color="success" 
                                            onClick={() => handleNext(i)}
                                        >
                                            <KeyboardArrowRightIcon />
                                        </IconButton>
                                    </div>

                                    <img
                                        className={'max-h-[150px] object-contain rounded-tl-[5px] rounded--tr-[5px]'}
                                        src={img}
                                    />

                                    <div className="absolute bottom-0 left-[50%] translate-x-[-50%] duration-300 transition-opacity invisible opacity-0 group-hover:opacity-100 group-hover:visible">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(i)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            }
        </>
    );
};