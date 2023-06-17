import { Fragment } from "react";
import Head from 'next/head';


import Hero from '../components/homepage/hero';
import FeaturedPosts from "../components/homepage/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";



function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>Angela's Blog</title>
                <meta name="description" content="Blog about software engineer and all things interesting to me." />
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts}/>
        </Fragment>
    )
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts
        }
    }
}

export default HomePage;
