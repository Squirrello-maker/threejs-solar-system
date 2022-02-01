export default class AudioManager
{
    constructor(ambientSrc, clickSrc)
    {
        this.ambient = new Audio(ambientSrc);
        this.clickSound = new Audio(clickSrc);
    }
    playAmbient()
    {
        if(this.ambient.paused)
        {
            this.ambient.play();
        }
    }
    playInteraction()
    {
        if(this.clickSound.paused)
        {
            this.clickSound.play();
        }
    }

}