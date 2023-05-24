import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Dashboard')
    }

    async getHtml(){
        return `
        <h1>Elixirs Of Harry Potter</h1>
        <p>L'élixir de Happypotter est une potion magique unique en son genre. Créée par les sorciers les plus talentueux, cette boisson mystérieuse est réputée pour son effet incroyablement positif sur l'humeur et le bien-être. Une gorgée de cet élixir enchanté suffit à dissiper les nuages gris de la tristesse et à illuminer votre journée. Avec son mélange secret d'ingrédients magiques et d'extraits de plantes rares, l'élixir de Happypotter est le remède parfait pour retrouver joie et sourire</p>
       
            <div class="difficulty">
            <a href="/Elixirs=Advanced" class="nav__link" data-link>Advanced</a>
            <a href="/Elixirs=Moderate" class="nav__link" data-link>Moderate</a>
            <a href="/Elixirs=Beginner" class="nav__link" data-link>Beginner</a>
            <a href="/Elixirs=OrdinaryWizardingLevel" class="nav__link" data-link>Ordinary Wizarding Level</a>
          </div> <br>
        `
    }
}