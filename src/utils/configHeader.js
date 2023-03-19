function configHeader(token = "") {
    if (token) {
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json; charset=utf-8",
            },
        };
    }
    return {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    };
}

export default configHeader;
