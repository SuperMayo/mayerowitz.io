<script>
    import "$lib/app.css"
</script>

<style>

    @keyframes shape {
    from {
        border-radius: 29% 71% 45% 55% / 70% 25% 75% 25%;
    }

    to {
        border-radius: 79% 21% 39% 61% / 30% 68% 32% 70%;
    }
    }

 .container {
    box-shadow: inset 1em 1em 15px rgba(0, 128, 128, 0.03);
    padding: 2rem 3rem;
    background: linear-gradient(
        45deg,
        rgba(17, 128, 127, 0.05) 0%,
        rgba(17, 128, 127, 0.003) 100%
    );
    animation: 5s shape ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    width: 50%;
    height: 30vh;
    margin: 0 auto;
 }
</style>

<div class = "container">
</div>