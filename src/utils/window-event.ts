window.onload = () => {
    window.onresize = () => {
        const windowWidth = document.body.clientWidth;
        if (windowWidth < 1250 && windowWidth > 1000) {
            const resetWidth = windowWidth - 450;
            const marginWidth = resetWidth * 0.2;
            const radio = Math.round(resetWidth * 0.8 / 794 * 100);
            const el = document.querySelector('.rs-view-inner') as HTMLElement;
            console.log(el?.offsetWidth);
            el.style.transform = `scale(${radio/100})`;
            el.style.marginLeft = `${marginWidth / 2}px`;
        } else if (windowWidth >= 1250) {
            const el = document.querySelector('.rs-view-inner') as HTMLElement;
            console.log(el?.offsetWidth);
            el.style.transform = `scale(1)`;
            el.style.marginLeft = `auto`;
        }
    }    
}
export { };
