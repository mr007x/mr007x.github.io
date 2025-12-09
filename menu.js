async function loadMenu() {
    try {
        const res = await fetch("./menu.json");
        const menu = await res.json();

        const title = document.getElementById("site-title");
        const nav = document.getElementById("navbar");

        title.textContent = menu.title;

        // Rekursiv funktion som bygger menyer
        function buildItems(items, container) {
            items.forEach(item => {
                const li = document.createElement("li");

                if (item.children) {
                    li.classList.add("dropdown");

                    const label = document.createElement("span");
                    label.textContent = item.label;
                    li.appendChild(label);

                    const ul = document.createElement("ul");
                    ul.classList.add("dropdown-content");

                    // bygg barnmenyn rekursivt
                    buildItems(item.children, ul);

                    li.appendChild(ul);
                } else {
                    const link = document.createElement("a");
                    link.href = item.link;
                    link.textContent = item.label;
                    li.appendChild(link);
                }

                container.appendChild(li);
            });
        }

        buildItems(menu.items, nav);

    } catch (err) {
        console.error("Kunde inte ladda menydata:", err);
    }
}

loadMenu();

// Mobilnav toggle
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu-center");

    if (burger) {
        burger.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }
});
