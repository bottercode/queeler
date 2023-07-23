"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Query: {
        getUsers: () => {
            const users = [
                {
                    id: 1,
                    username: "botter",
                    email: "botter@gmail.com",
                },
                {
                    id: 2,
                    username: "lassi",
                    email: "lassi@gmail.com",
                },
            ];
            return users;
        },
    },
};
//# sourceMappingURL=resolver.js.map