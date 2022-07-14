import { Code, Text } from "@chakra-ui/react";

export const QuestionDescription = ({
    description
}: {
    description: string;
}) => {
    return (
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
            {description}
            <Text>
                {" "}
                <Code my="1rem" p="8px">
                    git branch -M&lt;newname&gt;
                </Code>{" "}
            </Text>
        </Text>
    );
};
