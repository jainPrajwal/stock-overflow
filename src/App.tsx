import { Button, Flex, Show } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Header } from './components/header/Header';
import { Question } from './components/Question';
import { loadQuestions } from './features/question/QuestionSlice';
import { AskQuestion } from './pages/askQuestion/AskQuestion';
import { Home } from './pages/home/Home';
import { Profile } from './pages/profile/Profile';

function App() {
 

    return (
        <>
            <Header />
            <Show below="md">
                <Flex pos="fixed" bottom="10px" right="10px" zIndex="1">
                    <Button
                        colorScheme="telegram"
                        height={`32px`}
                        borderRadius={`2px`}
                        fontSize={`sm`}
                        fontWeight={`normal`}
                    >
                        Ask Question
                    </Button>
                </Flex>
            </Show>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path='/questions/ask' element={<AskQuestion />}></Route>
                <Route path='/questions/:questionId' element={<Question />}></Route>
                <Route path='/user/profile' element={<Profile />}></Route>
                {/* <Route path='/user/drafts' element={<Drafts />}></Route>
                <Route path='/user/bookmarks' element={<Bookmarks />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}> </Route> */}

            </Routes>

        </>
    );


}

export default App;
