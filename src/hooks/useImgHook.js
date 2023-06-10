import { useState } from "react";


const useImgHook = (data) => {
    let img = '';
    const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_Image_Upload_Token}`

    const formData = new FormData();
    formData.append('image', data.sportImg[0])

    fetch(img_hosting_url, {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(imgResponse => {
            console.log(imgResponse)
            img = imgResponse
        })
        console.log("image form img:", img)

    return img;
};

export default useImgHook;