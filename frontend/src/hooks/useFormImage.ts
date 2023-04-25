import {FieldValues, UseFormReturn, UseFormWatch} from "react-hook-form";
import {useEffect, useState} from "react";

const useFormImage = <T extends FieldValues> (name:any, watch: UseFormWatch<T>, defaultValue?:string,) => {
    const [fileUrl, setFileUrl] = useState(defaultValue);

    useEffect(() => {
        const file = watch(name) as File

        if(!file){
            setFileUrl(defaultValue)
            return
        }

        const fileBlob = new Blob([file], {type: file.type});
        const url = URL.createObjectURL(fileBlob);
        setFileUrl(url)
    }, [watch(name)])

    return { fileUrl }
}

export default useFormImage