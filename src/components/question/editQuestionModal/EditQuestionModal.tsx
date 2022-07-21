import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ButtonGroup,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,

} from '@chakra-ui/react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Question, UserDefinedQuestionsType } from '../../../constants';
import { updateQuestionService } from '../../../services';
import { CustomQuillToolbar, formats, modules } from '../../CustomToolbar';
import { MultipleTagsInput } from '../../MultipleTagsInput';
export const EditQuestionModal = ({ isOpen, onClose, question }: {
  isOpen: boolean;
  onClose: () => void;
  question: Question
}) => {

  const [questionDetails, setQuestionDetails] = useState<UserDefinedQuestionsType>({
    title: question.title,
    description: question.description,

    inputTag: {
      input: ``,
      tags: question.tags
    }
  });
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(state => state.profile)

  return <>
    <Modal onClose={onClose} isOpen={isOpen} size={`3xl`}
      variant={`dark`}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList justifyContent="start">
              <Tab>Write</Tab>
              <Tab>Preview</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex gap="24px">
                  <Box flexGrow="1" maxW="870px">
                    <form
                      onSubmit={(e) => {
                       
                        e.preventDefault();
                        if (!profile) {
                          toast.error(`Please login to avail these features`)
                          return;
                        }
                        if (questionDetails.title && questionDetails.description) {
                          dispatch(updateQuestionService({
                            question: {
                              title: questionDetails.title,
                              description: questionDetails.description,
                              tags: questionDetails.inputTag.tags
                            },
                            questionId: question._id
                          }))

                          toast.success(`Question Updated Successfully`)
                        }
                        onClose();
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "12px"
                      }}
                    >
                      <FormControl paddingBlock="12px">
                        <FormLabel margin="0" htmlFor="title">
                          Title
                        </FormLabel>
                        <FormHelperText marginBlock="8px">
                          Be specific and imagine you’re asking a question to another
                          person
                        </FormHelperText>
                        <Input variant="outline" placeholder="Title" id="title"
                          value={questionDetails.title || ``}
                          onChange={(e) => {
                            setQuestionDetails(prevState => ({ ...prevState, title: e.target.value }));
                          }}
                        />
                      </FormControl>
                      <FormControl paddingBlock="12px">
                        <FormLabel margin="0" htmlFor="description">
                          Description
                        </FormLabel>
                        <FormHelperText marginBlock="8px">
                          Include all the information someone would need to answer your
                          question
                        </FormHelperText>
                        <CustomQuillToolbar toolbarId={"t3"} />
                        <ReactQuill
                          defaultValue={questionDetails.description || question.description}
                          theme="snow"
                          onChange={(value) => {
                            setQuestionDetails(prevState => ({ ...prevState, description: value }));
                          }}
                          placeholder={"Write something awesome..."}
                          modules={modules("t3")}
                          formats={formats} />
                      </FormControl>
                      <FormControl paddingBlock="12px">
                        <FormLabel margin="0" htmlFor="tags">
                          Tags
                        </FormLabel>
                        <FormHelperText marginBlock="8px">
                          Add up to 5 tags to describe what your question is about
                        </FormHelperText>

                        <MultipleTagsInput setQuestionDetails={setQuestionDetails}
                          questionDetails={questionDetails}
                        />
                      </FormControl>

                      <FormControl>
                        <ButtonGroup gap="4">
                          <Button
                            colorScheme="telegram"
                            height={`32px`}
                            borderRadius={`2px`}
                            fontSize={`sm`}
                            fontWeight={`normal`}
                            type="submit"
                          >
                            Edit Question
                          </Button>
                          <Button
                            height={`32px`}
                            borderRadius={`2px`}
                            fontSize={`sm`}
                            fontWeight={`normal`}
                          >
                            Save Draft
                          </Button>
                        </ButtonGroup>
                      </FormControl>
                    </form>



                  </Box>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Box dangerouslySetInnerHTML={{ __html: questionDetails.description || "" }}></Box>

              </TabPanel>
            </TabPanels>
          </Tabs>



        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal></>
}
