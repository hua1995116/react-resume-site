import axios from 'axios';

export async function getTheme(type: string) {
    const base = '';
    const result = await axios.get(`${base}/themes/${type}.css`);
    const themesStyles = document.getElementById('rs-themes-data');
    if (themesStyles) {
        try {
            themesStyles.innerHTML = result.data;
          } catch (e) {
            console.log(e);
          }
    } else {
        const style = document.createElement('style'); 
        style.id = 'rs-themes-data';
        style.innerHTML = result.data;
        document.head.appendChild(style);
    }
    
}
