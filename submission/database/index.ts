import express from "express"
import sequelize from "./connect.db"

const startServer = async () => {
    const app = express()

    try {
        await sequelize.authenticate()
        await sequelize.drop()
        await sequelize.sync()
        app.listen(3002, () => {
            console.log('server start')
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()