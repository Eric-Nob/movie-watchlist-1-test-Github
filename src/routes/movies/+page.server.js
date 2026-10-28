import db from "#lib/server/db.js";

export async function load() {
    return {
      movies: await db.getMovies(),
    };
}