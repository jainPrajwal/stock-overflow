import { Box, Code, Text } from "@chakra-ui/react";
import React from "react";

export const AnswerDescription = ({ }) => {
    return (
        <Box>
            <Text>
                To rename a branch while pointed to any branch:
                <Text>
                    {" "}
                    <Code my="1rem" p="8px">
                        git branch -m &lt;oldname&gt; &lt;newname&gt;
                    </Code>{" "}
                </Text>
                To rename the current branch:
                <Text>
                    {" "}
                    <Code my="1rem" p="8px">
                        {" "}
                        git branch -m&lt;newname&gt;{" "}
                    </Code>{" "}
                </Text>
                To push the local branch and reset the upstream branch:
                <Text>
                    {" "}
                    <Code my="1rem" p="8px">
                        git push origin -u&lt;newname&gt;{" "}
                    </Code>{" "}
                </Text>
                To delete the remote branch:
                <Text>
                    {" "}
                    <Code my="1rem" p="8px">
                        git push origin --delete&lt;oldname&gt;{" "}
                    </Code>{" "}
                </Text>
                A way to remember this is -m is for "move" (or mv), which is how you
                rename files. Adding an alias could also help. To do so, run the
                following: git config --global alias.rename 'branch -m' If you are on
                Windows or another case-insensitive filesystem, and there are only
                capitalization changes in the name, you need to use -M, otherwise, git
                will throw branch already exists error:
                <Text>
                    {" "}
                    <Code my="1rem" p="8px">
                        git branch -M&lt;newname&gt;
                    </Code>{" "}
                </Text>
            </Text>
        </Box>
    );
};
