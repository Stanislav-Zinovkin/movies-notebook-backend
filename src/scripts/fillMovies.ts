import { PrismaClient } from "../../generated/prisma";
import { fethcMovies, TMDBMovie } from "src/utils/tmdb.utils";

const prisma = new PrismaClient();

async function saveMovies(page: number) {
    const movies: TMDBMovie[] = await fethcMovies(page);

    for (const m of movies) {
        await prisma.movie.upsert({
            where: { tmdbId: m.id },
            update: {},
            create: {
                tmdbId: m.id,
                title: m.title,
                overview: m.overview,
                releaseDate: new Date(m.release_date),
                posterPath: m.poster_path,
            },
        });
    }
    console.log(`Saved page ${page}, ${movies.length} movies`);
}

async function main() {
    for ( let page = 1; page <= 5; page++) {
        await saveMovies(page);
    }
}

main()
  .then(() => {
    console.log("Done");
    prisma.$disconnect();
  })
  .catch((err) => {
    console.log(err);
    prisma.$disconnect();
  })