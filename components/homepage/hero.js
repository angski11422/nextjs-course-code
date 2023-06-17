import Image from 'next/image';

import styles from './hero.module.css';

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.image}>
                <Image src="/images/site/angela.png" alt="an image of Angela" width={300} height={300}/>
            </div>
            <h1>Hi, I'm Angela!</h1>
            <p>I blog about web development - full stack with React and Python.</p>
        </section>
    )
}

export default Hero