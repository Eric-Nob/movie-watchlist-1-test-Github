import { error, fail, redirect } from '@sveltejs/kit';
import db from '#lib/server/db.js';

// Dein bestehender Ordner heisst [movies].
// Deshalb ist die ID aus der Adresse unter params.movies verfügbar.

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const movie = await db.getMovie(params.movies);

    if (!movie) {
        error(404, 'Dieser Film wurde nicht gefunden.');
    }

    return {
        movie
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    delete: async ({ request, params }) => {
        const data = await request.formData();
        const id = data.get('id');

        // Nur den Film der aktuell geöffneten Detailseite löschen.
        if (typeof id !== 'string' || id !== params.movies) {
            return fail(400, {
                message: 'Die Film-ID ist ungültig.'
            });
        }

        let deleted;

        try {
            deleted = await db.deleteMovie(id);
        } catch (cause) {
            console.error('Film konnte nicht gelöscht werden:', cause);

            return fail(500, {
                message: 'Löschen fehlgeschlagen. Bitte versuche es erneut.'
            });
        }

        if (!deleted) {
            error(404, 'Dieser Film wurde nicht gefunden.');
        }

        redirect(303, '/movies');
    }
};