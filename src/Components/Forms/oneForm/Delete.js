import React, { useContext } from 'react'
import {
    Box,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import axios from 'axios'
import FormContext from '../../../Context/formContext'
import { BASE_URL } from '../../../Eviornment.config'

const Delete = ({ fieldid, formid }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast = useToast()
    const [formState, dispatch] = useContext(FormContext);
    const deleteFormField = async () => {
        try {
            let data = {
                fields: [fieldid],
                formId: formid
            }
            let result = await axios.post(BASE_URL + 'deleteFormField', data)
            if (result.status === 200) {
                dispatch({ type: 'deleteField', payload: fieldid })
                toast({
                    title: 'Field Deleted',
                    description: 'Thanks',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                onClose()
            }
        }
        catch (e) {
            toast({
                title: 'Sorry...',
                description: 'Something went wrong!',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            console.log(e)
        }
    }
    return (
        <>
            <Box marginX={2}>
                <Button onClick={onOpen} size='xs' colorScheme='teal'>Delete</Button>
            </Box>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Field
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => deleteFormField()} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default Delete