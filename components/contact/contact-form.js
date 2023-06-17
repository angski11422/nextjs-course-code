import { useEffect, useState } from 'react';
import styles from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact',{
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    };
}

function ContactForm() {
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);
        }
    }, [requestStatus]);

    async function sendMessageHandler(e) {
        e.preventDefault();

        const newMessage = {
            name: enteredName,
            email: enteredEmail,
            message: enteredMessage
        }

        setRequestStatus('pending');
        try {
            await sendContactData(newMessage);
            setRequestStatus('success');
            setEnteredEmail('');
            setEnteredMessage('');
            setEnteredName('');
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus('error');
        }
    }

    let notification;
    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on the way!'
        }
    }
    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Your message was sent successfully!'
        }
    }
    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError
        }
    }

    return (
        <section className={styles.contact}>
            <h1>How can I help you?</h1>
            <form className={styles.form} onSubmit={sendMessageHandler}>
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <label htmlFor='email'>Your email</label>
                        <input 
                            type='email' 
                            id='email' 
                            required 
                            value={enteredEmail} 
                            onChange={(e) => setEnteredEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor='name'>Your name</label>
                        <input 
                            type='text' 
                            id='name' 
                            required 
                            value={enteredName} 
                            onChange={(e) => setEnteredName(e.target.value)}
                        />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor='message'>Your message</label>
                        <textarea 
                            id='message' 
                            rows='5' 
                            required
                            value={enteredMessage} 
                            onChange={(e) => setEnteredMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={styles.actions}>
                        <button>Send Message</button>
                    </div>
                </div>
            </form>
            {notification && (
                <Notification 
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    )
}

export default ContactForm