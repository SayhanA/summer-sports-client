import { useEffect } from "react"

const useTitle = title => {
    useEffect( () => {
        document.title = "Car&Toy" + " " + "|" + " " + title;
    } , [title])
}

export default useTitle;