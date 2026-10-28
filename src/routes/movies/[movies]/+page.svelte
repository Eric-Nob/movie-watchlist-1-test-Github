<script>
    /** @type {import('./$types').PageProps} */
    let { data, form } = $props();
</script>

<svelte:head>
    <title>{data.movie.title} | ScreenStack</title>
</svelte:head>

<a class="btn btn-outline-light mb-4" href="/movies">
    Zurück zu den Filmen
</a>

<div class="row g-4">
    <div class="col-12 col-md-4">
        <img
            class="img-fluid rounded movie-poster"
            src={data.movie.poster}
            alt={'Filmplakat: ' + data.movie.title}
        />
    </div>

    <div class="col-12 col-md-8">
        <h1>{data.movie.title}</h1>

        <dl class="row mt-4">
            <dt class="col-sm-3">Jahr</dt>
            <dd class="col-sm-9">{data.movie.year}</dd>

            <dt class="col-sm-3">Dauer</dt>
            <dd class="col-sm-9">{data.movie.length}</dd>
        </dl>

        <h2 class="h4">Darsteller</h2>

        {#if data.movie.actors?.length}
            <ul>
                {#each data.movie.actors as actor}
                    <li>{actor}</li>
                {/each}
            </ul>
        {:else}
            <p>Für diesen Film wurden noch keine Darsteller erfasst.</p>
        {/if}

        {#if form?.message}
            <p class="alert alert-danger" role="alert">
                {form.message}
            </p>
        {/if}

        <details class="mt-5">
            <summary class="text-danger">Film löschen</summary>

            <p class="mt-3">
                Möchtest du «{data.movie.title}» aus deiner Sammlung löschen?
            </p>

            <form method="POST" action="?/delete">
                <input
                    type="hidden"
                    name="id"
                    value={data.movie._id}
                />

                <button class="btn btn-danger" type="submit">
                    Film endgültig löschen
                </button>
            </form>
        </details>
    </div>
</div>

<style>
    .movie-poster {
        width: 100%;
        max-width: 420px;
    }
</style>