import exerciseApiRoutes from './exerciseApiRoutes'

const initApiRoutes = (app) => {
    app.use("/api/v1/exercise", exerciseApiRoutes)
}

export default initApiRoutes;