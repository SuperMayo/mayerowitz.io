<script>
    import '../app.css';
    import Header from '../lib/Header.svelte';
</script>

<div class="flex flex-col min-h-screen">
    <Header
        siteTitle="Antoine Mayerowitz"
        menuLinks={[{name: "Home", link: "/"}, {name: "Blog", link: "/blog"}]} />
    <div class="mx-auto my-one max-w-5xl w-full flex-auto">
        <slot></slot>
    </div>
</div>