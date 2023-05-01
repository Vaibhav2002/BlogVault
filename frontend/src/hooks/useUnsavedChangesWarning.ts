import {useEffect} from "react";
import nProgress from "nprogress";
import {useRouter} from "next/router";

export default function useUnsavedChangesWarning(condition: boolean) {
    const router = useRouter()

    useEffect(() => {

        const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            e.returnValue = true
        }

        const onRouteChangeStartHandler = () => {
            if (condition && !window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
                nProgress.done()
                throw "Route change aborted"
            }
        }

        window.addEventListener("beforeunload", beforeUnloadHandler)
        router.events.on("routeChangeStart", onRouteChangeStartHandler)

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler)
            router.events.off("routeChangeStart", onRouteChangeStartHandler)
        }

    }, [condition, router.events]);

}