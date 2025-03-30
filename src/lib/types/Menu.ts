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

export const authMenuItems: MenuItem[] = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
];

export const footerMenuItems: MenuItem[] = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
];