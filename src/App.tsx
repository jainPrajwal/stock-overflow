import { Box, Button, Flex, Show } from '@chakra-ui/react';

import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Header } from './components/header/Header';

import { AskQuestion } from './pages/askQuestion/AskQuestion';
import { Login } from './pages/auth/Login';
import { Home } from './pages/home/Home';
import { Profile } from './pages/profile/Profile';
import { SingleQuestionPage } from './pages/singleQuestionPage/SingleQuestionPage';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Bookmarks } from './pages/bookmark/Bookmarks';
import { TaggedQuestionsPage } from './pages/tag/TaggedQuestionsPage';
import { TaggedQuestionPage } from './pages/tag/TaggedQuestionPage';
import { UnansweredQuestionsPage } from './pages/unanswered/UnansweredQuestionsPage';
import { Signup } from './pages/auth/Signup';
import { LandingPage } from './pages/landingPage/LandingPage';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/errorBoundary/ErrorFallback';
import { useAppDispatch } from './app/hooks';
import { logoutButtonPressed } from './features/auth/AuthSlice';


function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />




            {(location.pathname !== `/login` && location.pathname !== `/signup`) && <Header />}
            <Show below="md">
                <Flex pos="fixed" bottom="10px" right="10px" zIndex="1">
                    <Button
                        colorScheme="telegram"
                        height={`32px`}
                        borderRadius={`2px`}
                        fontSize={`sm`}
                        fontWeight={`normal`}
                        onClick={() => {
                            navigate(`/questions/ask`)
                        }}
                    >
                        Ask Question
                    </Button>
                </Flex>
            </Show>
            <ErrorBoundary
                key={location.pathname}
                FallbackComponent={ErrorFallback}
                onReset={() => {
                    console.log(`on reset called`)
                    // reset the state of your app so the error doesn't happen again
                    dispatch(logoutButtonPressed());
                }}
                onError={() => {
                    console.log(`on error called`);
                    dispatch(logoutButtonPressed());

                    // navigate(`/login`)
                }}
            >
                <Routes>
                    <Route path='/' element={<LandingPage />}  >
                        <Route path="" element={<Home />} />
                        <Route path='questions/ask' element={<PrivateRoute><AskQuestion /></PrivateRoute>} />
                        <Route path='questions/:questionId' element={<SingleQuestionPage />} />
                        <Route path='user/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path='questions/tagged' element={<TaggedQuestionsPage />} />
                        <Route path='questions/tagged/:tag' element={<TaggedQuestionPage />} />
                        <Route path='user/bookmarks' element={<PrivateRoute><Bookmarks /></PrivateRoute>} />
                        <Route path='questions/unanswered' element={<UnansweredQuestionsPage />} />
                    </Route>

                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </ErrorBoundary>
        </>
    );


}

export default App;
