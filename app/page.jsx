import Feed from "@components/Feed";

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">
                    AI-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur quibusdam, quasi id accusantium maxime nobis. Rem,
                dicta iste debitis magni fugit vel numquam eius blanditiis culpa
                iusto. Architecto, quibusdam voluptatum.
            </p>
            <Feed />
        </section>
    );
};

export default Home;
