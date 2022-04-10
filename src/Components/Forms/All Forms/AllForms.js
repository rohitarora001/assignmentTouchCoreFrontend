import { useEffect, useContext } from 'react'
import { Flex, Box, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import FormCard from './FormCard'
import FormContext from '../../../Context/formContext'
import { BASE_URL } from '../../../Eviornment.config'
const AllForms = () => {
    const [formState, dispatch] = useContext(FormContext);
    useEffect(() => {
        const GetAll = () => {
            axios.get(BASE_URL + 'getAllForms')
                .then(result => {
                    dispatch({ type: 'setData', payload: result.data })
                })
        }
        GetAll()
    }, [])
    return (
        <div className='CreateFormPage'>
            <Flex direction={'column'} width={'90vw'}>
                <Box marginY={4}>
                    <Text fontSize='4xl'>
                        All Forms Page
                    </Text>
                </Box>
                {formState.formData !== null && formState.formData.length ?
                    <Stack spacing={3}>
                        {
                            formState.formData?.map((el, index) => {
                                return (
                                    <FormCard key={index} formName={el.name} id={el._id} isChecked={el.isChecked} />
                                )
                            })
                        }
                    </Stack>
                    :
                    <Stack spacing={3}>
                        <Box marginY={4}>
                            <Text fontSize='1xl'>
                                No forms found...!
                            </Text>
                        </Box>
                    </Stack>
                }
            </Flex>
        </div>
    )
}

export default AllForms