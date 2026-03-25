const http = require("http");
const fs = require("fs");

const filePath = "./users.json";
const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/user") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
        const newUser = JSON.parse(body);
        const users = JSON.parse(fs.readFileSync(filePath));

        const exists = users.find(u => u.email === newUser.email);
        if (exists) {
            res.end("Email already exists");
            return;
        }

        newUser.id = Date.now();
        users.push(newUser);

        fs.writeFileSync(filePath, JSON.stringify(users));

        res.end("User added");
    });
}
if (req.method === "PATCH" && req.url.startsWith("/user/")) {
    const id = req.url.split("/")[2];

    let body = "";
    req.on("data", chunk => body += chunk);

    req.on("end", () => {
        const updatedData = JSON.parse(body);
        const users = JSON.parse(fs.readFileSync(filePath));

        const user = users.find(u => u.id == id);
        if (!user) return res.end("User not found");

        Object.assign(user, updatedData);

        fs.writeFileSync(filePath, JSON.stringify(users));
        res.end("User updated");
    });
}
if (req.method === "DELETE" && req.url.startsWith("/user/")) {
    const id = req.url.split("/")[2];

    let users = JSON.parse(fs.readFileSync(filePath));

    users = users.filter(u => u.id != id);

    fs.writeFileSync(filePath, JSON.stringify(users));

    res.end("User deleted");
}
if (req.method === "GET" && req.url === "/user") {
    const users = JSON.parse(fs.readFileSync(filePath));
    res.end(JSON.stringify(users));
}
if (req.method === "GET" && req.url.startsWith("/user/")) {
    const id = req.url.split("/")[2];

    const users = JSON.parse(fs.readFileSync(filePath));
    const user = users.find(u => u.id == id);

    res.end(JSON.stringify(user || "User not found"));
}
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});