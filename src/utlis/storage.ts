export const saveUser = (token: string): void => {
        if (typeof window !== "undefined") {
                sessionStorage.setItem("token", token);
        }
};

export const getUser = (): string | null => {
        if (typeof window !== "undefined") {
                return sessionStorage.getItem("token");
        }
        return null;
};

export const removeUser = (): void => {
        if (typeof window !== "undefined") {
                sessionStorage.removeItem("token");
        }
};
