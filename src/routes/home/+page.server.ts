import type { PageServerLoad } from './$types';
import type { PostShow } from "$lib/models/PostShow";
import type { ThreadShow } from "$lib/models/ThreadShow";

const featuredThread = {
    title: "Wave Compiler",
    slugTitle: "wave-compiler",
    description: `Creating a compiler from scratch from the lexer to his own virtual machine and bycode assembler`,
    updatedAt: new Date(2023, 1, 20),
} satisfies ThreadShow;

const posts = [
    {
        thumbUrl: "https://cdn.dribbble.com/users/42044/screenshots/3005807/media/d21d0efa3fc373de652cb6beac874f23.png",
        thread: {
            title: "Aspnet Core"
        },
        slugTitle: "e-commerce-microservice-architecture-with-aspnet-core-kafka-and-grpc",
        title: "E-Commerce microservice architecture with Aspnet Core, Kafka and Grpc",
        createdAt: new Date(2023, 5, 23)
    },
    {
        thumbUrl: "https://codequotient.com/blog/wp-content/uploads/2022/05/Difference-Between-Compiler-And-Interpreter-In-Java.jpg",
        thread: {
            title: "Wave Compiler"
        },
        slugTitle: "creating-a-stack-virtual-machine-for-the-wave-compiler",
        title: "Creating a Stack virtual machine for the Wave Compiler",
        createdAt: new Date(2023, 3, 5)
    },
    {
        thumbUrl: "https://media.licdn.com/dms/image/D5612AQFaqTn2Q7-D1A/article-cover_image-shrink_720_1280/0/1660195253757?e=2147483647&v=beta&t=DlC0CtegN4HZTI7kRSxBU-PRZLmtcWe9hOpHygcB6So",
        thread: {
            title: "By Hand Projects"
        },
        slugTitle: "how-hard-is-to-build-your-own-neural-network",
        title: "How hard is to build your own neural network?",
        createdAt: new Date(2023, 2, 12)
    },
] satisfies PostShow[];

export const load: PageServerLoad = async () => {
    return {
        featuredThread,
        posts,
    }
}