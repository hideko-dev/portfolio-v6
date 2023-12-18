import toast from "svelte-french-toast";
import { sendFormContent } from "$lib/form/form.js";

const style = 'border-radius: 10px; border: 1px solid var(--border); background: rgba(var(--bg-rgb), 0.3); backdrop-filter: blur(10px); color: var(--text);'
const position = "bottom-right";

function error(text) {
    toast.error(text, { position, style })
}

export async function sendForm(mail, message){
    const form = await sendFormContent(mail, message)

    let duration = 0;
    if(form === "success") {
        duration = 500;
        toast.loading("Sending...", { duration, position, style });
    }
    setTimeout(() => {
        switch (form) {
            case "success":
                toast.success("Transmission completed.", { position, style });
                break;
            case "error.mail":
                error("The format of the email is wrong.");
                break;
            case "error.msg":
                error("Please write your message.");
                break;
            case "error.all":
                error("Please fill in all fields.");
                break;
        }
    }, duration)

}