import { useEffect } from "react"

const useTitle = title => {
    useEffect( () => {
        document.title = "Summer Sport" + " " + "|" + " " + title;
    } , [title])
}

export default useTitle;