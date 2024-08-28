import express from 'express'

import { app } from './index.js'

console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
    console.log("Server is running on port 8000");
});