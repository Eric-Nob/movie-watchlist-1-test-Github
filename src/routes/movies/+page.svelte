<script>
    import MovieCard from '#lib/components/MovieCard.svelte';

    let { data } = $props();
</script>

<svelte:head>
    <title>Filme | ScreenStack</title>
</svelte:head>

<div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
    <div>
        <h1 class="mb-1">Filme</h1>
    </div>

    <a class="btn btn-primary" href="/movies/create">
        Neuen Film erfassen
    </a>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
    {#each data.movies as movie (movie._id)}
        <div class="col">
            <MovieCard {movie} />
        </div>
    {:else}
        <div class="col-12">
            <p>Noch keine Filme vorhanden.</p>
        </div>
    {/each}
</div>