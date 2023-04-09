import app from "./app";

const port = 3000

app.listen(port, (req, res) => res.send(`Server is running on port ${port}`))