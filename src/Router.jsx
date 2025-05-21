import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
    return(
        <Routes>
            <Route path="/"/>
            <Route path="/login" />
            <Route path="/login/:id"/>
        </Routes>
    )
}