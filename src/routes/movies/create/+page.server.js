import { fail, redirect } from '@sveltejs/kit';
import db from '#lib/server/db.js';

/**
 * Ein Textfeld aus dem Formular lesen.
 * @param {FormData} data
 * @param {string} name
 */
function textField(data, name) {
    const value = data.get(name);

    return typeof value === 'string' ? value.trim() : '';
}

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        const values = {
            title: textField(data, 'title'),
            year: textField(data, 'year'),
            length: textField(data, 'length'),
            poster: textField(data, 'poster')
        };

        if (!values.title || !values.year || !values.length) {
            return fail(400, {
                message: 'Bitte fülle Titel, Jahr und Dauer aus.',
                values
            });
        }

        // Formulare liefern Text. Das Jahr soll als Zahl gespeichert werden.
        const year = Number(values.year);

        if (!Number.isInteger(year) || year < 1 || year > 9999) {
            return fail(400, {
                message: 'Bitte gib ein gültiges Jahr von 1 bis 9999 ein.',
                values
            });
        }

        // Eine Bild-URL ist optional.
        if (values.poster) {
            try {
                const url = new URL(values.poster);

                if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                    return fail(400, {
                        message: 'Die Bild-URL muss mit http:// oder https:// beginnen.',
                        values
                    });
                }
            } catch {
                return fail(400, {
                    message: 'Bitte gib eine vollständige Bild-URL ein oder lasse das Feld leer.',
                    values
                });
            }
        }

        let id;

        try {
            id = await db.createMovie({
                title: values.title,
                year,
                length: values.length,
                poster: values.poster
            });
        } catch (cause) {
            console.error('Film konnte nicht gespeichert werden:', cause);

            return fail(500, {
                message: 'Speichern fehlgeschlagen. Bitte prüfe die Datenbankverbindung.',
                values
            });
        }

        // Nach dem Speichern zur Detailseite des neuen Films wechseln.
        redirect(303, '/movies/' + id);
    }
};