<!-- A simple checkbox slider component -->

<!-- JS -->
<script>
    export let checked = false
    export let onClick = () => {}
</script>

<!-- HTML -->
<label class="toggler-wrapper style-1">
    <input type="checkbox" bind:checked={checked} on:click={onClick}>
    <div class="toggler-slider">
        <div class="toggler-knob"></div>
    </div>
</label>

<!-- CSS -->
<style>
    .toggler-wrapper {
        display: block;
        width: 45px;
        height: 25px;
        cursor: pointer;
        position: relative;
    }

    .toggler-wrapper input[type="checkbox"] {
        display: none;
    }

    .toggler-wrapper input[type="checkbox"]:checked+.toggler-slider {
        background-color: var(--colour-accent);
    }

    .toggler-wrapper .toggler-slider {
        background-color: var(--colour-dark);
        position: absolute;
        border-radius: 100px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        -webkit-transition: all 300ms ease;
        transition: all 300ms ease;
    }

    .toggler-wrapper .toggler-knob {
        position: absolute;
        -webkit-transition: all 300ms ease;
        transition: all 300ms ease;
    }

    .toggler-wrapper.style-1 input[type="checkbox"]:checked+.toggler-slider .toggler-knob {
        left: calc(100% - 19px - 3px);
    }

    .toggler-wrapper.style-1 .toggler-knob {
        width: calc(25px - 6px);
        height: calc(25px - 6px);
        border-radius: 50%;
        left: 3px;
        top: 3px;
        background-color: #fff;
    }
</style>