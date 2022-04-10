import React from 'react'
import './index.css'
import { Flex, Button, Box, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Index = () => {
    return (
        <>
            <div className='mainPage'>
                <Flex direction={'column'}>
                    <Stack spacing={30}>
                        <Box mx={5}>
                            <Text fontSize='5xl'>
                                Welcome to TouchCore Assignment!
                            </Text>
                        </Box>
                        <Flex justify={'center'}>
                            <Box marginRight={1}>
                                <Link to="/create-new">
                                    <Button colorScheme='teal'>Create New Form</Button>
                                </Link>
                            </Box>
                            <Box marginLeftt={1}>
                                <Link to="/all-forms">
                                    <Button colorScheme='teal'>Open Existing Form</Button>
                                </Link>
                            </Box>
                        </Flex>
                    </Stack>
                </Flex>
            </div>
        </>
    )
}

export default Index