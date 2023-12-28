export default class Tabs{
    constructor(idElemento){
        this.tabs = document.getElementById(idElemento);
        this.nav = this.tabs.querySelector('.tabs');

        this.nav.addEventListener('click', (e) => {
            if([...e.target.classList].includes('tabs__button')){
                //Obtenemos la tab que queremos mostrar
                const tab = e.target.dataset.tab;


                //quitamos la clase activa de alguna otra tabs que la tengan
                if(this.tabs.querySelector('.tab--active')){
                    this.tabs.querySelector('.tab--active').classList.remove('tab--active');
                }
                if(this.tabs.querySelector('.tabs__button--active')){
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }
                //agregamos la clase activa al tab
                this.tabs.querySelector(`#${tab}`).classList.add('tab--active');
                //agregamos la clase active al boton
                e.target.classList.add('tabs__button--active');
            }
        })
    }
}

