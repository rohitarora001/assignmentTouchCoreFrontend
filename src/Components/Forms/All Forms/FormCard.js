import { useContext } from 'react'
import { Flex, Button, Box, Spacer, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { BASE_URL } from '../../../Eviornment.config'
import FormContext from '../../../Context/formContext'
import { Link } from 'react-router-dom'

const FormCard = ({ formName, id }) => {
    const toast = useToast()
    const [formState, dispatch] = useContext(FormContext);
    const handleDeleteForm = async () => {
        try {
            let form = []
            form.push(id)
            const data = {
                forms: form
            }
            let result = await axios.post(BASE_URL + 'deleteForm', data)
            if (result.status === 202) {
                dispatch({ type: 'deleteForm', payload: id })
                toast({
                    title: 'Form Deleted',
                    description: 'Thanks',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
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
        }
    }
    return (
        <>
            <Flex boxShadow='base' background={'white'} height={'4rem'} alignItems={'center'} borderRadius={5}>
                <Box px={'4'}>
                    <Heading size='md'>{formName}</Heading>
                </Box>
                <Spacer />
                <Box>
                    <Link to={`/all-forms/${id}`}>
                        <Button variant={'outline'} colorScheme='teal' mr='4'>
                            Open
                        </Button>
                    </Link>
                    <Button
                        colorScheme='teal'
                        mr='4'
                        onClick={() => handleDeleteForm()}
                    >
                        Delete
                    </Button>
                </Box>
            </Flex>
        </>
    )
}

export default FormCard