import React from 'react'
import {
    Box,
    Button,
    AlertDialog,
    Input,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { BASE_URL } from '../../../Eviornment.config'
const NewField = ({ formid, getData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast = useToast()
    const [fieldName, setFieldName] = React.useState('')
    const AddFormField = async () => {
        try {
            let data = {
                name: fieldName,
                formId: formid,
            }
            let result = await axios.post(BASE_URL + 'newFormField', data)
            console.log(BASE_URL + 'newFormField')
            if (result.status === 200) {
                toast({
                    title: 'Field Added',
                    description: 'Thanks',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                setFieldName('')
                getData()
            }
            onClose()
        }
        catch (error) {
            toast({
                title: 'Sorry...',
                description: 'Something went wrong!',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            onClose()
        }
    }
    return (
        <>
            <Box marginX={3}>
                <Button onClick={onOpen} size='xs' colorScheme='teal'>Add Field</Button>
            </Box>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Add Field
                        </AlertDialogHeader>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Input
                                margin={3}
                                width={'90%'}
                                placeholder={'Field Name'}
                                value={fieldName}
                                size='md'
                                onChange={(e) => setFieldName(e.target.value)}
                            />
                        </Box>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => AddFormField()} ml={3}>
                                Add
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default NewField