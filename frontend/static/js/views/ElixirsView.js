import AbstractView from "./AbstractView.js"
// import { fs } from "server";
//ici on va 
export default class extends AbstractView {

    constructor(params) {
        super(params)
        this.setTitle('Visualiser Elixirs')
    }

    async getHtml() {
        //console.log(this.params.id)

        // const nu = Number(this.params.difficulty)

        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }
       
        const data = await getData('https://wizard-world-api.herokuapp.com/Elixirs?Difficulty' + this.params.difficulty)
        // fs.writeFile(this.params.difficulty+'.json', data, err =>{
        //     if(err) throw err
        //     console.log('sucess')
        // })
        // const article = data.find(item => item.id === nu)

        console.log(data)
        let result = `            <h1>Elixirs by Difficulty</h1>
        <h2 style="color:red">Désoler j'ai essayé de stocker je fichier json ça marche seulement quand je fais un refresh après avoir affiché le résultat</h2>
        <p>L'élixir de Happypotter est une potion magique unique en son genre. Créée par les sorciers les plus talentueux, cette boisson mystérieuse est réputée pour son effet incroyablement positif sur l'humeur et le bien-être. Une gorgée de cet élixir enchanté suffit à dissiper les nuages gris de la tristesse et à illuminer votre journée. Avec son mélange secret d'ingrédients magiques et d'extraits de plantes rares, l'élixir de Happypotter est le remède parfait pour retrouver joie et sourire</p>
        <div class="difficulty">
          <a href="/Elixirs=Advanced" class="nav__link" data-link>Advanced</a>
          <a href="/Elixirs=Moderate" class="nav__link" data-link>Moderate</a>
          <a href="/Elixirs=Beginner" class="nav__link" data-link>Beginner</a>
          <a href="/Elixirs=OrdinaryWizardingLevel" class="nav__link" data-link>Ordinary Wizarding Level</a>
        </div> <br>`;
       
        data.forEach((element) => {
      
            result += `
            
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">nom : ${element.name}</h5>
                    <h5 class="card-text">effet : ${element.effect}</h5>
                    <ul>la liste des ingrédients
                        ${element.ingredients.map((ingredient) => `<li>${ingredient.name}</li>`).join("")}
                    </ul>
                </div>
            </div>`;
        });
        console.log(result)
        return result
    }
}