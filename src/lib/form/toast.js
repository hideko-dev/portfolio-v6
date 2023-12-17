import toast from "svelte-french-toast";
import { sendFormContent } from "$lib/form/form.js";

const duration = 500
const style = 'border-radius: 100px; border: 1px solid var(--border); background: rgba(var(--bg-rgb), 0.3); backdrop-filter: blur(10px); color: var(--text)'

export async function sendForm(mail, message){
    const form = await sendFormContent(mail, message)

    toast.loading("Sending...", {
        duration,
        position: "bottom-center",
        style
    })
    setTimeout(() => {
        if(form === "success") {
            toast.success("Transmission completed.", {
                position: "bottom-center",
                style
            })
        } else if(form === "error.msg") {
            toast.error("Please write your message.", {
                position: "bottom-center",
                style
            })
        } else if(form === "error.mail") {
            toast.error("The format of the email is wrong.", {
                position: "bottom-center",
                style
            })
        }
    }, duration)

}