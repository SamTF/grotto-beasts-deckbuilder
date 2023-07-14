<!-- Graphs interesting stats regarding the deck -->

<!-- JS -->
<script>
    // Imports
    import { GetManaCurve, CountBeastTypes } from "$lib/cardUtils"
    import { Bar } from 'svelte-chartjs'
    // import 'chart.js/auto';
    import {
        Chart,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    } from 'chart.js';

    // Props
    export let fullCards

    // Chart JS stuff
    Chart.register(
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    );

    // DEFAULT SYLING
    Chart.defaults.font.family = '"Alegreya Sans","Roboto",sans-serif'
    Chart.defaults.font.weight = 700
    Chart.defaults.font.size = 16
    // Chart.defaults.color = '#370101'
    Chart.defaults.elements.bar.borderWidth = 1
    Chart.defaults.elements.bar.borderColor = 'hsla(0, 100%, 100%, 0.5)'
    Chart.defaults.scale.grid.display = false
    Chart.defaults.maintainAspectRatio = false
    Chart.defaults.responsive = true
    Chart.defaults.plugins.legend.display = false
    Chart.defaults.plugins.title.font.size = 20
    Chart.defaults.plugins.title.color = '#370101'
    Chart.defaults.plugins.title.display = true
    

    // Chart Data
    let manaCurve = GetManaCurve(fullCards)
    let beastTypes = CountBeastTypes(fullCards)

    // sorting data -> https://stackoverflow.com/questions/52785769/how-can-i-sort-data-from-highest-to-lowest-in-chart-js
    // chart tooltip -> https://www.chartjs.org/docs/latest/samples/tooltip/content.html
    //               -> https://www.chartjs.org/docs/latest/configuration/tooltip.html

    //////////// MANA CURVE
    let manaData = {
        labels: Object.keys(manaCurve),
        datasets: [
            {
                label: 'Number of cards',
                data: Object.values(manaCurve),
                // borderWidth: 2,
                backgroundColor: ['rgba(98,  182, 239,0.4)'],
            }
        ]        
    }

    // Tooltip
    const manaTooltip = (tooltipItems) => {
        const label = tooltipItems.label
        const value = tooltipItems.raw
        return `${value} cards can be summoned for ${label} mana`
    }

    // Chart styling options
    const manaOptions = {
        // general options
        responsive: true,
        maintainAspectRatio: false,

        // Axes
        scales: {
            x: {
                grid: { color: 'hsl(43 100% 52% / 10%)' },
                ticks: { color: 'hsla(0, 0%, 0%, 0.5)' },
                title: {
                    display: true,
                    text: 'Summoning Cost',
                    // color: 'hsla(0, 0%, 0%, 0.75)',
                    // color: '#370101',
                    font: { size: 16, family: '"Alegreya Sans","Roboto",sans-serif' },
                },
            },
            y: {
                grid: { color: 'hsl(43 100% 52% / 10%)' },
                ticks: { color: 'hsla(0, 0%, 0%, 0.5)' },
                title: {
                    display: true,
                    text: 'Number of Cards',
                    // color: 'hsla(0, 0%, 0%, 0.75)',
                    // color: '#370101',
                    font: { size: 16, family: '"Alegreya Sans","Roboto",sans-serif' },
                },
            },
        },

        // Text
        plugins: {
            title: {
                display: true,
                text: 'Summoning Curve',
                font: { size: 20, family: '"Alegreya Sans","Roboto",sans-serif' },
            },
            legend: {
                position: 'top',
                display: false,
            },
            tooltip: { callbacks: {
                label: manaTooltip,
                title: function() {return null},
            }}
        }
    }

    //////////// BEAST TYPES
    const beastData = {
        labels: Object.keys(beastTypes),
        datasets: [{
            label: 'Number of Beasts',
            data: Object.values(beastTypes),
            backgroundColor: ['#25609a', '#fac648', '#2bddf8', '#ade985', '#de3852', '#2a481e', '#370101']
        }]
    }
    const beastOptions = {
        scales: {
            x: { title: {
                display: true,
                text: 'Beast Types',
                // color: 'hsla(0, 0%, 0%, 0.75)',
                color: '#370101',
                font: { size: 16, family: '"Alegreya Sans","Roboto",sans-serif' },
            }},
            y: { title: {
                display: true,
                color: '#370101',
                text: 'Number of Beasts'
            }},
        },
        plugins: {
            title: {text: 'Beast Types', display: true}
        }
    }
</script>

<!-- HTML -->
<div class="deck-graphs-container">
    <h2>Graphs</h2>

    <div class="graphs-container">
        <!-- Mana Curve -->
        <div class="mana-curve">
            <Bar data={manaData} options={manaOptions} />
        </div>

        <!-- Beast Types -->
        <div class="beast-types">
            <Bar data={beastData} options={beastOptions} />
        </div>
    </div>
</div>

<style>
    .mana-curve {
        height: 300px;
        width: 400px;

        font-size: 20rem;
        color: hsla(0, 0%, 0%, 0.5);
    }
</style>