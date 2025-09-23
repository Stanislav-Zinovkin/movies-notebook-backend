import { PrismaClient } from "generated/prisma";
import { fethcMovies, TMDBMovie } from "../utils/tmdb.utils";

const prisma = new PrismaClient();

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function savePage(page: number) {
    const movies: TMDBMovie[] = await fethcMovies(page);

    await Promise.all(
        movies.map(m => 
            prisma.movie.upsert({
                where: { tmdbId: m.id },
                update: {},
                create: {
                    tmdbId: m.id,
                    title: m.title,
                    overview: m.overview,
                    releaseDate: new Date(m.release_date),
                    posterPath: m.poster_path,
                },
            })
        )
    );
    console.log(`Saved page ${page}, ${movies.length} movies`);
}

async function main() {
    const totalPages = 1000;
    const batchSize = 7;
    const delayMs = 5000;
    const dayLimit = 1000;
    let requestMade = 0;

    for (let i = 1; i <= totalPages; i += batchSize) {
        if (requestMade + batchSize > dayLimit) {
            console.log(`Reached daily limit of ${dayLimit} requests. Stopping.`);
            break;
        }
        const batchPages = Array.from( { length: batchSize }, (_, idx) => i + idx)
                                .filter(p => p <= totalPages);
        await Promise.all(batchPages.map(p => savePage(p)));
        console.log(`Batch ${i}-${i + batchSize - 1} done, waiting ${delayMs/1000}s`);
        await delay(delayMs);
    }
}

main()
  .then(() => {
    console.log("All done");
    prisma.$disconnect();
  })
  .catch(err => {
    console.log(err);
    prisma.$disconnect();
  });