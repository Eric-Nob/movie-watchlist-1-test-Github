<script>
    /** @type {import('./$types').PageProps} */
    let { form } = $props();
</script>

<svelte:head>
    <title>Film erfassen | ScreenStack</title>
</svelte:head>

<h1>Neuen Film erfassen</h1>

<p>Titel, Erscheinungsjahr und Dauer sind Pflichtfelder.</p>

{#if form?.message}
    <p class="alert alert-danger" role="alert">
        {form.message}
    </p>
{/if}

<form method="POST" action="?/create" class="movie-form">
    <div class="mb-3">
        <label class="form-label" for="title">
            Titel
        </label>

        <input
            class="form-control"
            id="title"
            name="title"
            type="text"
            required
            value={form?.values?.title ?? ''}
        />
    </div>

    <div class="mb-3">
        <label class="form-label" for="year">
            Erscheinungsjahr
        </label>

        <input
            class="form-control"
            id="year"
            name="year"
            type="number"
            min="1"
            max="9999"
            step="1"
            required
            value={form?.values?.year ?? ''}
        />
    </div>

    <div class="mb-3">
        <label class="form-label" for="length">
            Dauer
        </label>

        <input
            class="form-control"
            id="length"
            name="length"
            type="text"
            placeholder="z. B. 114 Minuten"
            required
            value={form?.values?.length ?? ''}
        />
    </div>

    <div class="mb-3">
        <label class="form-label" for="poster">
            Bild-URL (optional)
        </label>

        <input
            class="form-control"
            id="poster"
            name="poster"
            type="url"
            placeholder="https://example.com/filmplakat.jpg"
            aria-describedby="poster-help"
            value={form?.values?.poster ?? ''}
        />

        <p id="poster-help" class="form-text">
            Ohne Bild-URL wird das Platzhalterbild verwendet.
        </p>
    </div>

    <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-primary" type="submit">
            Film speichern
        </button>

        <a class="btn btn-outline-light" href="/movies">
            Abbrechen
        </a>
    </div>
</form>

<style>
    .movie-form {
        max-width: 640px;
    }
</style>