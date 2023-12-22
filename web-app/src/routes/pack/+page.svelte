<!-- JS -->
<script>
    // Imports
    import Meta from '$components/Meta/Meta.svelte'
    import { browser } from '$app/environment'
    import { onMount } from 'svelte';
    import svelteTilt from 'vanilla-tilt-svelte';
    import { slide, fade } from "svelte/transition"

    let rotatation = { x:0, y:0, z:0 }

    const onMouseMove = (event, element) => {
        const maxDeg = 20
        const mouse = { x: event.clientX, y: event.clientY }
        const size = { height: event.target.height, width: event.target.width }
        // console.log(mouse)
        // console.log(window.innerWidth)
        // console.log(window.innerHeight)
        // console.log(event)
        // console.log(`${event.offsetX} + ${event.offsetY}`)
        // console.log(size)

        // find the middle
        const middle = {
            x: size.width / 2,
            y: size.height / 2
        }

        // find offset position within element
        const offset = {
            x: event.offsetX,
            y: event.offsetY
        }

        // find position relative to center
        const relative = {
            x: offset.x - middle.x,
            y: offset.y - middle.y
        }

        // get middle offset as percentage
        const percentage = {
            x: Math.round((relative.x / middle.x) * 100) / 100,
            y: Math.round((relative.y / middle.y) * 100) / 100
        }

        const degrees = {
            x: percentage.x * maxDeg,
            y: percentage.y * maxDeg,
        }

        // console.log(offset)
        // console.log(relative)
        // console.log(percentage)
        console.log(degrees)

        event.target.style.setProperty('--rotateX', degrees.x + 'deg')
        event.target.style.setProperty('--rotateY', -1 * degrees.y + 'deg')
        // event.target.style.setProperty('background-color', 'red')
    }

    const onMouseLeave = (event) => {
        event.target.style.setProperty('--rotateX', 0 + 'deg')
        event.target.style.setProperty('--rotateY', 0 + 'deg')
    }

    let card
    let bounds;

    if (browser) {
        card = document.querySelector('.card');;
        console.log(card);
    }

    onMount(() => {
        // card = document.querySelector('.card');;
        // console.log(card);

        // function rotateToMouse(e) {
        //     const mouseX = e.clientX;
        //     const mouseY = e.clientY;
        //     const leftX = mouseX - bounds.x;
        //     const topY = mouseY - bounds.y;
        //     const center = {
        //         x: leftX - bounds.width / 2,
        //         y: topY - bounds.height / 2
        //     }
        //     const distance = Math.sqrt(center.x**2 + center.y**2);
            
        //     card.style.transform = `
        //         scale3d(1.07, 1.07, 1.07)
        //         rotate3d(
        //         ${center.y / 100},
        //         ${-center.x / 100},
        //         0,
        //         ${Math.log(distance)* 3}deg
        //         )
        //     `;
            
        //     card.querySelector('.glow').style.backgroundImage = `
        //         radial-gradient(
        //         circle at
        //         ${center.x * 2 + bounds.width/2}px
        //         ${center.y * 2 + bounds.height/2}px,
        //         #ffffff55,
        //         #0000000f
        //         )
        //     `;
        // }

        // card.addEventListener('mouseenter', () => {
        //     bounds = card.getBoundingClientRect();
        //     document.addEventListener('mousemove', rotateToMouse);
        // });

        // card.addEventListener('mouseleave', () => {
        //     document.removeEventListener('mousemove', rotateToMouse);
        //     card.style.transform = '';
        //     card.style.background = '';
        // });
    })

    let showPack = true

    const pullCards = async () => {
        const res = await fetch('/api/pack')
        const data = await res.json()

        console.log(data)
        pulledCards = data

        showPack = false
    }

    $: pulledCards = []

    const flipCard = (event) => {
        // event.target.style.setProperty('--rotateX', degrees.x + 'deg')
        // flip = true
        console.log("AAAaaa")
        console.log(event.target.parentElement.parentElement)
        event.target.parentElement.parentElement.style.setProperty('--rotateY', '180deg')
    }

    let flip = false;
    
    
</script>

<!-- METADATA -->
<Meta title='Pack Opening' />

<!-- HTML -->
<div class="header-divider" style="margin-bottom: 0;"></div>

<div class="pack-sim-container">
    <div class="explorer-filters">
        <h1>Pack Opening Sim</h1>
        <div style="margin-bottom: 2rem;"></div>
    </div>

    <div class="page center">
        {#if showPack}
            <div
                class="tilt"
                on:click={pullCards}
                on:keydown={pullCards}
                use:svelteTilt={{
                    max: 15,
                    reverse: true,
                    reset: true,
                    perspective: 1000
            }}>
                <img src="images/pack_front.webp" alt="aaaa">
            </div>
        {/if}
        
        <!-- <div class="card-pack">
            <img src="images/pack_front.webp" alt="aaaa" on:mousemove={onMouseMove} on:click={() => {}}>
        </div> -->
        <!-- <div class="card">
            3D Card
            <div class="glow"></div>
        </div> -->

        <!-- <div class="card">
            <img src="images/cards/back.webp" alt="aaaa" on:mousemove={onMouseOver} on:mouseleave={onMouseLeave}>
            <div class="glow"></div>
        </div> -->

        <div class="pulled-cards-container">
            {#each pulledCards as card}
                <!-- <p>{card}</p> -->
                <!-- <div class="card-image" use:svelteTilt={{ reverse: true }}>
                    <img src="images/cards/back.webp" alt="card">
                </div> -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flip-card" use:svelteTilt={{ reverse: true, glare: false, "max-glare": 0.5 }} on:click={flipCard} transition:fade>
                    <div class="flip-card-inner" class:flip={flip}>
                        <div class="flip-card-front card-image">
                            <img src="images/cards/back.webp" alt="card">
                        </div>
                        <div class="flip-card-back card-image" class:card-image-holo={card.holo}>
                            <img src={card.imageURL.small} alt={card.name}>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<!-- CSS -->
<style>
    :global(body) {
        font-family: system-ui, sans-serif;
        perspective: 1500px;
        /* background: linear-gradient(white, #efefef); */
    }
    .page {
        /* height: 70dvh; */
        perspective: 1500px;
    }

    .pulled-cards-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        /* grid-auto-rows: 1fr; */
        grid-template-rows: 1fr 1fr;

        gap: 2rem;
    }

    .tilt img {
        max-height: 400px;
        filter: drop-shadow(0 0 0.33rem #370101);
        transition: all 150ms;
    }
    .tilt img:hover {
        filter: drop-shadow(0 0 0.75rem #370101) hue-rotate(30deg);
        transform: scale(1.1);
        cursor: pointer;
    }

    .card-image {
        border-radius: 8px;
    }
    .card-image img {
        max-height: 275px;
        border-radius: 8px;
        position: relative;
    }
    .card-image-holo::after {
        position: absolute;
        top: 10px;
        right: 10px;
        content: "✨";
        font-size: 3rem;
    }
    /* .card-image:hover {
        transform: scale(1) !important;
    } */

    .flip-card {
        height: 275px;
        width: 200px;
        perspective: 1500px;
    }

    .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        transform: rotateY(var(--rotateY));
    }

    /* .flip-card:hover .flip-card-inner {
        transform: rotateY(180deg);
    } */

    .flip-card-front, .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .flip-card-back {
        transform: rotateY(180deg);
    }

    /* .flip {
        transform: rotateY(180deg);
    } */

    .card-pack img {
        --rotateX: 0;
        --rotateY: 0;

        position: relative;
        filter: drop-shadow(0 0 0.33rem #370101);
        max-height: 400px;
        transform-style: preserve-3d;
        transform: rotateX(var(--rotateX)) rotateY(var(--rotateY)) perspective(1500px);

        transition: all 100ms;
    }

    .card-pack img:hover {
        /* transform: rotate3d(2, 0, 0, 10deg) scale(1.0); */
        transform: scale3d(1.10, 1.10, 1.10) rotateX(var(--rotateX)) rotateY(var(--rotateY));
        filter: drop-shadow(0 0 0.75rem #370101);
    }

    .card {
        font-weight: bold;
        padding: 1em;
        text-align: right;
        color: #181a1a;
        
        /* width:  300px;
        height: 400px; */
        /* box-shadow: 0 1px 5px #00000099; */
        
        border-radius: 10px;
        /* background-image: url(https://images.unsplash.com/photo-1557672199-6e8c8b2b8fff?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80); */
        /* background-image: url(images/pack_front.webp);
        background-size: cover; */
        
        position: relative;
        
        transition-duration: 300ms;
        transition-property: transform, box-shadow;
        transition-timing-function: ease-out;
        transform: rotate3d(0);

        /* background-color: red; */
        /* width: 500px;
        height: 600px; */

        /* display: grid;
        place-items: center; */
    }

    .card:hover {
        transition-duration: 150ms;
        /* box-shadow: 0 5px 20px 5px #00000044; */
    }

    .card .glow {
        position: absolute;
        width: 92%;
        height: 93%;
        left: 4%;
        top: 3%;

        border-radius: 1rem;
        
        background-image: radial-gradient(circle at 50% -20%, #ffffff22, #0000000f);
    }

    .card img {
        max-height: 480px;
        filter: drop-shadow(0 0 0.33rem #370101);
        transition: all 150ms;
    }

    .card img:hover {
        filter: drop-shadow(0 0 0.75rem #370101);
    }
</style>
