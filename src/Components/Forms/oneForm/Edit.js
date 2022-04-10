import React, { useContext } from 'react'
import {
    Box,
    Button,
    AlertDialog,
    Input,
    Flex,
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
const Edit = ({ name, fieldid, formid,getData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast = useToast()
    const [formState, dispatch] = useContext(FormContext);
    const [fieldName, setFieldName] = React.useState(name)
    const editFormField = async () => {
        try {
            let data = {
                fieldName: fieldName,
                fieldId: fieldid,
                formId: formid,
            }
            let result = await axios.post(BASE_URL + 'editFormFields', data)
            console.log(result)
            if (result.status === 200) {
                toast({
                    title: 'Field Edited',
                    description: 'Thanks',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                getData()
                onClose()
            }
        }
        catch (error) {
            toast({
                title: 'Sorry...',
                description: 'Something went wrong!',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }
    return (
        <>
            <Box marginX={1}>
                <Button onClick={onOpen} size='xs' colorScheme='teal'>Edit</Button>
            </Box>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Edit Field
                        </AlertDialogHeader>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Input
                                margin={3}
                                width={'90%'}
                                value={fieldName}
                                size='md'
                                onChange={(e) => setFieldName(e.target.value)}
                            />
                        </Box>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => editFormField()} ml={3}>
                                Edit
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default Edit