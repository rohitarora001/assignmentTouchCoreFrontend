import { useState } from 'react'
import { Flex, Button, Box, Stack, Text, useToast, Input, Badge } from '@chakra-ui/react'
import axios from 'axios'
import { BASE_URL } from '../../Eviornment.config'
import './createnew.css'
const CreateNew = () => {
    const toast = useToast()
    const [FormName, setFormName] = useState('')
    const [Fields, setFields] = useState([])
    const [FieldsType, setFieldsType] = useState('')
    const [FieldsName, setFieldsName] = useState('')
    const handleFields = () => {
        if (FieldsName || FieldsType) {
            let newFieldsObj = {
                name: FieldsName,
                type: FieldsType
            }
            setFields([...Fields, newFieldsObj])
        }
    }
    const CreateForm = async () => {
        try {
            console.log('FormName', FormName)
            console.log('Fields', Fields)
            const data = {
                name: FormName,
                fields: Fields
            }
            const result = await axios.post(BASE_URL + 'createForm', data)
            if (result.status === 201) {
                toast({
                    title: 'Form Created',
                    description: 'Thanks',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                setFormName('')
                setFieldsName('')
                setFieldsType('')
                setFields([])
            }
        }
        catch (error) {
            toast({
                title: 'Ooopsss....Something went wrong',
                description: 'Sorry!',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            console.log(error)
        }
    }
    return (
        <>
            <div className='CreateFormPage'>
                <Flex direction={'column'} width={'90vw'}>
                    <Stack spacing={1}>
                        <Box marginY={4}>
                            <Text fontSize='4xl'>
                                Create a new form now!
                            </Text>
                        </Box>
                        <Box>
                            <Input
                                placeholder='Form Name'
                                size='md'
                                type={'fg'}
                                value={FormName}
                                onChange={(e) => setFormName(e.target.value)}
                            />
                        </Box>
                        <Stack spacing={3}>
                            {
                                Fields.length ?
                                    <Box marginTop={10}>
                                        <Stack overflowY="auto"
                                            css={{
                                                '&::-webkit-scrollbar': {
                                                    width: '4px',
                                                },
                                                '&::-webkit-scrollbar-track': {
                                                    width: '6px',
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                    borderRadius: '24px',
                                                },
                                            }} direction='row'>
                                            {
                                                Fields.map((el, index) => {
                                                    return (
                                                        <Badge key={index} colorScheme='green'>{el.name}</Badge>
                                                    )
                                                })
                                            }
                                        </Stack>
                                    </Box>
                                    : null
                            }
                            <Box marginTop={10}>
                                <Text fontSize='2xl'>
                                    Enter Fields in this form
                                </Text>
                            </Box>
                            <Box my={2}>
                                <Stack spacing={3}>
                                    <Input
                                        placeholder='Field Name'
                                        size='md'
                                        value={FieldsName}
                                        onChange={(e) => setFieldsName(e.target.value)}
                                    />
                                    <Input
                                        placeholder='Field Input Type ex Number or Text'
                                        size='md'
                                        value={FieldsType}
                                        onChange={(e) => setFieldsType(e.target.value)}
                                    />
                                    <Button
                                        variant='outline'
                                        colorScheme='teal'
                                        onClick={() => handleFields()}
                                    >
                                        Add
                                    </Button>
                                </Stack>
                            </Box>
                            <Stack my={2}>
                                <Button
                                    colorScheme='teal'
                                    onClick={() => CreateForm()}
                                >
                                    Create Form
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Flex>
            </div>
        </>
    )
}

export default CreateNew