<script>
    let { movie } = $props();
</script>

<div class="movie-card">
    <img
        class="img-fluid"
        src={movie.poster}
        alt={movie.title}
    />

    <div class="details">
        <div class="title">
            <a href={'/movies/' + movie._id}>
                {movie.title}
            </a>
        </div>

        <div>Jahr: {movie.year}</div>
        <div>Dauer: {movie.length}</div>
    </div>
</div>

<style>
    .movie-card {
        border: 1px solid #555;
        height: 100%;
        background-color: #444;
        color: white;
    }

    .details {
        padding: 0.5em;
    }

    .title {
        font-weight: bold;
    }

    .title a {
        color: white;
        text-decoration: underline;
    }
</style>