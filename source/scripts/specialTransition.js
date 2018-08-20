export const specialTransitionEvent = (event) => {
    const target = event.currentTarget;
    const first = target.getElementsByClassName("special-transition__1")[0];
    const second = target.getElementsByClassName("special-transition__2")[0];

    first.classList.add("special-transition__1--active");
    second.classList.add("special-transition__2--active");
};

export const specialTransition = (target) => {
    const first = target.getElementsByClassName("special-transition__1")[0];
    const second = target.getElementsByClassName("special-transition__2")[0];

    first.classList.add("special-transition__1--active");
    second.classList.add("special-transition__2--active");
};
