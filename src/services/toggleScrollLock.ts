export const toggleScrollLock = () => {
    console.log(document.body.style.overflow);
    if (document.body.style.overflow !== "hidden") {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "scroll";
    }
};
