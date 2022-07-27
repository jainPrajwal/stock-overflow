import { useNavigate } from "react-router";

import React, { useRef, useState } from "react";



import { default as searchStyles } from "./SearchBar.module.css";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSearchedQuestions } from "../../utils/question/getSearchedQuestions";
import { Question } from "../../constants";
import { Box, Input } from "@chakra-ui/react";
import { onSearchChange } from "../../features/question/QuestionSlice";


const SearchBar = ({ searchbar, setSearchbar }: { searchbar: boolean, setSearchbar: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [localSearchQuery, setLocalSearchQuery] = useState("");
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const { questions, searchBy } = useAppSelector(state => state.question);
    const SearchBarRef = useRef(null);
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { autocomplete, autocompleteItems, autocompleteItem } =
        searchStyles;


    useOnClickOutside(SearchBarRef, setSearchbar);
    let dataWithSearchedResults = null;
    if (searchBy && searchBy.length > 0) {
        dataWithSearchedResults = getSearchedQuestions(
            {
                questions,
                searchedQuery: searchBy
            }
        );
    }



    return (
        <>
            <Box ref={SearchBarRef} className={`${autocomplete}`} >
                <Input
                    variant="outline"

                    size={["md"]}

                    type="text"
                    value={localSearchQuery}
                    placeholder="Search by question title..."
                    onKeyUp={(e) => {
                        if (e.key === `ArrowDown`) {
                            const target = e.target as HTMLInputElement;
                            const nextElementSibling = target.nextElementSibling;
                            target && nextElementSibling && ([...nextElementSibling.children][0] as HTMLInputElement)?.focus();
                        }
                    }}
                    onChange={(event) => {

                        setSearchbar(false)
                        setLocalSearchQuery(() => event.target.value);
                        if (timerId) {
                            clearTimeout(timerId);
                        }

                        setTimerId(
                            setTimeout(() => {
                                dispatch(onSearchChange({
                                    searchBy: event.target.value
                                }))
                            }, 500)
                        );
                    }}
                />
                {!searchbar && localSearchQuery && <div className={`${`${autocompleteItems}`} `}>
                    {localSearchQuery.length > 0 &&
                        dataWithSearchedResults && dataWithSearchedResults.map((question: Question, index: number) => {
                            let lowerCaseItemName = question.title.toLowerCase();
                            let lowerCaseSearchQuery = localSearchQuery.toLowerCase();
                            return (
                                <div
                                    className={`${autocompleteItem}`}
                                    onClick={() => {
                                        setSearchbar(true);
                                        setLocalSearchQuery(``)
                                        navigate(`/questions/${question._id}`);
                                    }}
                                    onKeyUp={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        if (index >= 0 && index < dataWithSearchedResults.length) {
                                            if (e?.key === `Enter`) {
                                                setSearchbar(true);
                                                setLocalSearchQuery(``)
                                                navigate(`/questions/${question._id}`);
                                            }
                                            else if (e.key === `ArrowDown`) {
                                                ((target)?.nextElementSibling as HTMLInputElement)?.focus();
                                            } else if (e?.key === `ArrowUp`) {
                                                if ((e.target as HTMLInputElement)?.previousElementSibling)
                                                    ((target)?.previousElementSibling as HTMLInputElement)?.focus();
                                                else {
                                                    const parentNode = target.parentNode;
                                                    const previousElementSibling = parentNode?.previousSibling;
                                                    parentNode && previousElementSibling && (previousElementSibling as HTMLInputElement).focus();
                                                }
                                            }
                                        }
                                    }}
                                    key={question._id}
                                    tabIndex={Number(index / 10)}
                                >
                                    {`${lowerCaseItemName}`.slice(
                                        0,
                                        `${lowerCaseItemName}`.indexOf(`${lowerCaseSearchQuery}`)
                                    )}
                                    <strong>
                                        {`${lowerCaseItemName}`.slice(
                                            `${lowerCaseItemName}`.indexOf(`${lowerCaseSearchQuery}`),
                                            `${lowerCaseItemName}`.indexOf(
                                                `${lowerCaseSearchQuery}`
                                            ) + `${lowerCaseItemName}`.length
                                        )}
                                    </strong>
                                </div>
                            );
                        })}
                </div>}
            </Box>
        </>
    );



};

export { SearchBar };
