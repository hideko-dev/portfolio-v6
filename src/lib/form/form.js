export const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendFormContent(mail, message) {
    const mailValid = pattern.test(mail);
    const msgValid = message.trim().length > 0;
    if(msgValid){
        if(mailValid) {
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mail,
                    message
                })
            });
            return "success"
        } else {
            return "error.mail"
        }
    } else {
        return "error.msg"
    }
}