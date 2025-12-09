async function loadMenu() {
    const res = await fetch("./menu.json");
    const menu = await res.json();
    const nav = document.getElementById("navbar");

    document.getElementById("site-title").textContent = menu.title;

    function buildItems(items) {
        const ul = document.createElement("ul");

        items.forEach(item => {
            const li = document.createElement("li");

            if (item.children) {
                li.className = "dropdown";
                li.innerHTML = `<span>${item.label}</span>`;
                li.appendChild(buildItems(item.children));
            } else {
                li.innerHTML = `<a href="${item.link}">${item.label}</a>`;
            }

            ul.appendChild(li);
        });

        return ul;
    }

    const rootItems = buildItems(menu.items).children;
    Array.from(rootItems).forEach(el => nav.appendChild(el));
}

loadMenu();
