export interface MenuItem {
    name: string;
    url: string;
}

export const menuItems: MenuItem[] = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Login", url: "/login" },
    { name: "Register", url: "/register" }
];